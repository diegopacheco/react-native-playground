import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  const {
    mode = 'development',
    platform = process.env.PLATFORM,
    minimize = mode === 'production',
  } = env;

  if (!platform) {
    throw new Error('Missing platform');
  }

  return {
    mode,
    devtool: false,
    entry: './src/remotes/calculator/index.ts',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        'react-native': path.resolve(__dirname, '../../../node_modules/react-native'),
      },
    },
    output: {
      path: path.join(__dirname, '../../../build/remotes/calculator', platform),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      publicPath: 'auto',
    },
    optimization: {
      minimize,
      minimizer: [
        new TerserPlugin({
          test: /\.(jsx?|tsx?)$/,
          extractComments: false,
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                '@react-native/babel-preset',
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new Repack.plugins.ModuleFederationPlugin({
        name: 'calculator',
        filename: 'calculator.js',
        exposes: {
          './Calculator': './src/remotes/calculator/Calculator.tsx',
        },
        shared: {
          react: {
            singleton: true,
            eager: false,
            requiredVersion: '19.1.1',
          },
          'react-native': {
            singleton: true,
            eager: false,
            requiredVersion: '0.82.0',
          },
        },
      }),
    ],
  };
};
