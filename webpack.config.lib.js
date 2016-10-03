var path = require('path') // eslint-disable-line no-var

module.exports = {
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib/',
  },
  module: {
    loaders: [
      {
        test: /\.png$/,
        loaders: ['url-loader?limit=7000'],
      },
    ],
  },
}
