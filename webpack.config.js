const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, 'dist'), 
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true 
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'assets/resource'
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Angelo Portfolio',
      filename: 'index.html',
      template: 'src/index.html',
      hash: true,
    }),
  ],
};