import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import * as Repack from '@callstack/repack';

export default (env) => {
  const {
    mode = 'development',
    context = Repack.getDirname(import.meta.url),
    entry = './index.js',
    platform = process.env.PLATFORM,
    minimize = mode === 'production',
    devServer = undefined,
    bundleFilename = undefined,
    sourceMapFilename = undefined,
    assetsPath = undefined,
    reactNativePath = new URL('./node_modules/react-native', import.meta.url).pathname,
  } = env;

  if (!platform) {
    throw new Error('Missing platform');
  }

  const isProd = mode === 'production';

  return {
    mode,
    devtool: false,
    context,
    entry: [
      ...Repack.getInitializationEntries(reactNativePath, {
        hmr: devServer && devServer.hmr,
      }),
      entry,
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        'react-native': reactNativePath,
      },
    },
    output: {
      clean: true,
      hashFunction: 'xxhash64',
      path: path.join(__dirname, 'build/generated', platform),
      filename: 'index.bundle',
      chunkFilename: '[name].chunk.bundle',
      publicPath: Repack.getPublicPath({ platform, devServer }),
    },
    optimization: {
      minimize,
      chunkIds: 'named',
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
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        context,
        mode,
        platform,
        devServer,
        output: {
          bundleFilename,
          sourceMapFilename,
          assetsPath,
        },
      }),
      new Repack.plugins.ModuleFederationPlugin({
        name: 'host',
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: '19.1.1',
          },
          'react-native': {
            singleton: true,
            eager: true,
            requiredVersion: '0.82.0',
          },
        },
      }),
    ],
  };
};
