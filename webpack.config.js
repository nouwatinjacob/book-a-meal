const path = require('path');
const webpack = require('webpack');

const PATHS = {
  dist: path.join(__dirname, 'client/src/dist')
};

module.exports = {
  entry: {
    app: './client/src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: PATHS.dist,
    hot: true
  },
};
