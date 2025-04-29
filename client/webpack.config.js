const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const extensions = [".js", ".jsx"];

const options = {
  fix: true,
};

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.jsx",
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  resolve: {
    extensions,
    alias: {
      '@leagacy': path.resolve(__dirname, 'src/'),
    }
  },
  devServer: {
    client: {
      overlay: false,
    },
    historyApiFallback: true, // Simplified configuration
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-react", { runtime: "automatic" }]],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({ extensions }),
    new ESLintPlugin(options),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  stats: "minimal",
};
