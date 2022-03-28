const path = require('path');
const golb = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const TersetWebpackPlugin = require('terser-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

module.exports = {
  entry: {
    index: path.join(__dirname, '../src/index.js'),
  },
  output: {
    filename: '[name].[chunkhash:4].js',
    path: path.join(__dirname, '../dist'),
  },
  cache: {
    type: 'filesystem',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),
      filename: 'index.html',
    }),
    new WebpackBar(),
    new MiniCssPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROFILE__: true,
      __EXPERIMENTAL__: true,
      __VARIANT__: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-flow'],
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
            },
          },
        ],
      },
      {
        test: /\.ott$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TersetWebpackPlugin({
        extractComments: false,
        minify: TersetWebpackPlugin.esbuildMinify,
      }),
    ],
  },
  externals: {},
  stats: {
    modules: false,
  },
  resolve: {
    alias: {
      react: path.join(__dirname, '../react-17.0.2/packages/react'),
      shared: path.join(__dirname, '../react-17.0.2/packages/shared'),
      'react-dom': path.join(__dirname, '../react-17.0.2/packages/react-dom'),
      scheduler: path.join(__dirname, '../react-17.0.2/packages/scheduler'),
      'react-reconciler': path.join(
        __dirname,
        '../react-17.0.2/packages/react-reconciler'
      ),
    },
  },
};
