const path = require('path')
const join = path.join
const resolve = path.resolve
const webpack = require('webpack')
const packageName = process.env.npm_package_config_package

const packageRoot = packageName ?
  resolve('.', 'packages', packageName) :
  resolve(__dirname)

module.exports = env => {
  const ifProd = (...args) => env.prod ? args : []
  const ifDev = (...args) => env.dev ? args : []

  return {
    entry: {
      examples: [
        ...ifDev(
          'react-hot-loader/patch',
          'eventsource-polyfill',
          'webpack-hot-middleware/client'
        ),
//        resolve(packageRoot, 'examples', 'src', 'index'),
        './examples/src/index',
      ],
      // dist: [
      //   ...ifDev(
      //     'react-hot-loader/patch',
      //     'eventsource-polyfill',
      //     'webpack-hot-middleware/client'
      //   ),
      //   '../examples/src/index',
      // ],
      vendor: ['babel-polyfill', 'react', 'react-dom', 'react-docgen', 'codemirror'],
    },
    output: {
      filename: 'bundle-[name].js',
      sourceMapFilename: 'bundle-[name].js.map',
      path: resolve(__dirname, 'dist', 'static'),
      pathinfo: !env.prod,
      publicPath: '/static/',
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
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
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'styled-components': path.resolve('./node_modules/styled-components'),
      },
    },
    context: __dirname,
    devtool: env.prod ? 'source-map' : 'module-eval-source-map',
    bail: env.prod,
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          loader: 'babel-loader',
          include: [
            join(__dirname, 'src'),
            join(__dirname, 'example'),
          ],
        },
        {
          test: /\.png$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
  }
}
