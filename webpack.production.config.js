const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './src/index',
  output: {
    path: __dirname + '/src/bundle/',
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
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
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
