const path = require('path');
const webpack = require('webpack');

const remotes = [
  { name: 'Calculator', path: './src/calculator/Calculator.tsx' },
  { name: 'NoteTaking', path: './src/noteTaking/NoteTaking.tsx' },
  { name: 'NoteTakingFooter', path: './src/noteTaking/NoteTakingFooter.tsx' },
  { name: 'HeaderInfoPage', path: './src/infoPage/HeaderInfoPage.tsx' },
  { name: 'ContentInfoPage', path: './src/infoPage/ContentInfoPage.tsx' },
  { name: 'FooterContentPage', path: './src/infoPage/FooterContentPage.tsx' },
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
    globalObject: 'globalThis',  // Changed from 'this' to 'globalThis'
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
      var: 'React',
    },
    'react-native': {
      root: 'ReactNative',
      commonjs2: 'react-native',
      commonjs: 'react-native',
      amd: 'react-native',
      var: 'ReactNative',
    },
    '@react-native-async-storage/async-storage': {
      root: 'AsyncStorage',
      commonjs2: '@react-native-async-storage/async-storage',
      commonjs: '@react-native-async-storage/async-storage',
      amd: '@react-native-async-storage/async-storage',
      var: 'AsyncStorage',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}));
