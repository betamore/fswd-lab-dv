var path = require('path'),
    webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/lib/main.js',
  output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      filename: 'bundle.js'
  },
  resolve: {
      modules: [path.resolve(__dirname, "app"), "node_modules"]
  },
  module: {
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ],
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    ]
  },

  plugins: [
      new HtmlWebpackPlugin({ title: 'D3 Playground', template: 'app/index.ejs' })
  ],

  devtool: 'inline-source-map',
  devServer: {
     contentBase: './public'
 }
};
