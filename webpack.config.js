const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const environment = process.env.ENVIRONMENT || 'development'

module.exports = {
  mode: environment,
  entry: {
    index: './src/public/js/index.js',
    team: './src/public/js/team.js',
    table: './src/public/js/table.js',
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/assets/[name].[ext]',
            },
          },
        ],
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
    new HtmlWebpackPlugin({
      filename: 'table.html',
      template: './src/public/table.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
  ],

  watch: true
}