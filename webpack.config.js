const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const environment = process.env.ENVIRONMENT || 'development'

module.exports = {
  mode: environment,
  entry: {
    index: './src/public/js/index.js',
    team: './src/public/js/team.js',

  },
  output: {
    path: path.resolve(__dirname, 'src', 'web'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map'
  },

  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/public/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'team.html',
      template: './src/public/team.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],

  watch: true
}