const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Load environment variables from .env file (for local development)
    // Also loads system environment variables (for Vercel deployment)
    // Automatically injects them via DefinePlugin
    new Dotenv({
      path: './.env', // Path to .env file (optional, will use system vars if not found)
      safe: false, // Don't require .env.example
      systemvars: true, // Load system environment variables as well (for Vercel)
      defaults: false, // Don't use .env.defaults
    }),
    // Copy public folder contents to dist folder (for Vercel deployment)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/',
      }
    ],
    historyApiFallback: true,
    hot: true,
    port: 4040,
    open: true,
  },
};
