import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import * as Repack from '@callstack/repack';

export default Repack.defineWebpackConfig((env) => {
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
    entry,
    resolve: {
      ...Repack.getResolveOptions({
        platform,
      }),
    },
    output: {
      clean: true,
      hashFunction: 'xxhash64',
      path: path.join(context, 'build/generated', platform),
      filename: 'index.bundle',
      chunkFilename: '[name].chunk.bundle',
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
          type: 'javascript/auto',
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@react-native/babel-preset'],
            },
          },
        },
        ...Repack.getAssetTransformRules({
          platform,
        }),
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
});
