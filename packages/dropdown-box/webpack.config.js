const path = require('path')
const join = path.join
const resolve = path.resolve
const webpack = require('webpack')

module.exports = env => {
  const ifProd = (...args) => env.prod || env.var ? args : []
  const ifDev = (...args) => env.dev ? args : []

  return {
    entry: {
      index: [
        ...ifDev(
          'react-hot-loader/patch',
          'eventsource-polyfill',
          'webpack-hot-middleware/client'
        ),
        './index',
      ],
      vendor: ['babel-polyfill', 'react', 'react-dom'],
      docs: ['../docs/docs'],
      'docs-play': ['../docs-play/index'],
    },
    output: {
      filename: 'bundle-[name].js',
      sourceMapFilename: 'bundle-[name].js.map',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
      publicPath: '/static/',
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
      ...(env.var ?
        [] :
        [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })]),
      ...ifDev(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ),
      ...ifProd(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false,
          },
          sourceMap: true,
          compress: {
            screw_ie8: true,
            warnings: false,
          },
        })
      ),
    ],
    resolve: {
      alias: {
        react: path.resolve('../../node_modules/react'),
        'react-dom': path.resolve('../../node_modules/react-dom'),
      },
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'module-eval-source-map',
    bail: env.prod,
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          loader: 'babel-loader',
          include: [
            join(__dirname, 'docs'),
            join(__dirname, 'src'),
          ],
        },
        {
          test: /\.png|\.svg|\.jpg$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /\.csv|.txt$/,
          loader: 'raw-loader',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
  }
}
