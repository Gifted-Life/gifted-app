const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/src/bundle/'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
    },
    {
      test: /\.sass$|\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass!postcss?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'),
    },
    ],
  },
  postcss: [
    require('autoprefixer-core'),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
    }),
  ],
};