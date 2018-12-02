const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Awesome application',
      template: './index.html',
      filename: './index.html',
    }),
    new TSLintPlugin({
      files: ['./src/**/*.ts'],
    }),
  ],
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
