const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractScss = new ExtractTextPlugin({
  filename: "css/[name].dll.css?id=[chunkhash]",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    librarys: ["./webpack/librarys.js"]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
              minimize: true,
              removeComments: true,
              collapseWhitespace: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: extractScss.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              publicPath: "../images"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
              publicPath: "../fonts"
            }
          }
        ]
      },
      { test: /\.ts$/, use: "ts-loader" }
    ]
  },
  output: {
    path: path.resolve(__dirname, "webpack/dist"),
    filename: "js/[name].dll.js?id=[chunkhash]",
    library: "[name]"
  },
  plugins: [
    extractScss,
    new CleanWebpackPlugin(["webpack/dist"]),
    new webpack.DllPlugin({
      name: "[name]",
      path: "webpack/[name]-manifest.json"
    })
  ],
  mode: "production"
};
