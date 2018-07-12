const path = require('path');
const webpack = require('webpack');

const PATHS = {
  build: path.join(__dirname, 'client/src/build')
};

module.exports = {
  entry: ['babel-polyfill', './client/src/index.js'
  ],
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true
  },
};
