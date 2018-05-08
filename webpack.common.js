const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const extractScss = new ExtractTextPlugin({
  filename: "css/[name].css?id=[chunkhash]",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  cache: true,
  entry: {
    index: "./src/js/index",
    register: "./src/js/register",
    login: "./src/js/login",
    table: "./src/js/table",
    password_forgot: "./src/js/password_forgot",
    passowrd_reset: "./src/js/passowrd_reset"
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
              removeComments: false,
              collapseWhitespace: false
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
              publicPath: "../images",
              outputPath: "images"
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
              publicPath: "../fonts",
              outputPath: "fonts"
            }
          }
        ]
      },
      { test: /\.ts$/, use: "ts-loader" }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    extractScss,
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "index"],
      filename: "index.html",
      template: "src/html/index.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "register"],
      filename: "register.html",
      template: "src/html/register.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "login"],
      filename: "login.html",
      template: "src/html/login.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "table"],
      filename: "table.html",
      template: "src/html/table.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "password_forgot"],
      filename: "password_forgot.html",
      template: "src/html/password_forgot.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "passowrd_reset"],
      filename: "passowrd_reset.html",
      template: "src/html/passowrd_reset.html"
    }),
    new ManifestPlugin()
    // new CopyWebpackPlugin([
    //   {
    //     from: "src/icon/apple-touch-icon.png",
    //     to: "apple-touch-icon.png",
    //     toType: "file"
    //   },
    //   {
    //     from: "./webpack/dist/",
    //     to: "",
    //     toType: "dir"
    //   }
    // ]),
    // new webpack.DllReferencePlugin({
    //   context: ".",
    //   manifest: require("./webpack/librarys-manifest.json")
    // })
  ],
  output: {
    filename: "js/[name].js?id=[chunkhash]",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
      name: "vendor"
    }
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  }
};
