const path = require('path');
const webpack = require('webpack');

const remotes = [
  { name: 'Calculator', path: './remotes/calculator/Calculator.tsx' },
  { name: 'NoteTaking', path: './remotes/noteTaking/NoteTaking.tsx' },
  { name: 'NoteTakingFooter', path: './remotes/noteTaking/NoteTakingFooter.tsx' },
  { name: 'HeaderInfoPage', path: './remotes/infoPage/HeaderInfoPage.tsx' },
  { name: 'ContentInfoPage', path: './remotes/infoPage/ContentInfoPage.tsx' },
  { name: 'FooterContentPage', path: './remotes/infoPage/FooterContentPage.tsx' },
];

module.exports = remotes.map(remote => ({
  mode: 'development',
  devtool: 'source-map',
  entry: remote.path,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${remote.name}.bundle.js`,
    library: {
      type: 'var',
      name: remote.name,
      export: 'default',
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-native': {
      root: 'ReactNative',
      commonjs2: 'react-native',
      commonjs: 'react-native',
      amd: 'react-native',
    },
    '@react-native-async-storage/async-storage': {
      root: 'AsyncStorage',
      commonjs2: '@react-native-async-storage/async-storage',
      commonjs: '@react-native-async-storage/async-storage',
      amd: '@react-native-async-storage/async-storage',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}));
