import * as Webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'

const isProduction = process.argv.indexOf('-p') >= 0
const outPath = path.join(__dirname, './dist')
const sourcePath = path.join(__dirname, './src')

const config: Webpack.Configuration = {
  context: sourcePath,
  entry:   {
    main:   './index.tsx',
    vendor: ['react', 'react-dom', 'mobx-react', 'react-router', 'mobx']
  },
  output: {
    path:       outPath,
    publicPath: '/',
    filename:   'bundle.js'
  },
  target:  'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main
    // module https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: ['browser', 'main'],
    plugins:    [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test:    /\.tsx?$/,
        exclude: /node_modules/,
        loader:  'eslint-loader'
      },
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use:  isProduction
          ? 'awesome-typescript-loader?module=es6'
          : ['react-hot-loader/webpack', 'awesome-typescript-loader']
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV':
        isProduction === true
          ? JSON.stringify('production')
          : JSON.stringify('development')
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name:      'vendor',
      filename:  'vendor.bundle.js',
      minChunks: Infinity
    }),
    new Webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable:  !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot:         true,
    stats:       {
      warnings: false
    }
  },
  node: {
    // workaround for webpack-dev-server issue
    // eslint-disable-next-line max-len
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs:  'empty',
    net: 'empty'
  }
}

export default config
