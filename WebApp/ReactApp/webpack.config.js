var webpack = require('webpack');
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
  entry: './components/Route.js',
  output: {
    path: BUILD_DIR,
    filename: "bundle.js"
  },
  module: {
    loaders: [ 
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
