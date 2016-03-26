var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/built',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, "src")
        ],
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      }
    ]
  }
};