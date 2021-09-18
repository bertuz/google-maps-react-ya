// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const path = require('path');

module.exports =  {
  mode: 'development',
  entry: './src/index.dev.js',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new HtmlWebpackRootPlugin(),
    new webpack.DefinePlugin({
      __GOOGLE_API_KEY__: JSON.stringify(process.env.GOOGLE_API_KEY)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    injectClient: false
  },
};
