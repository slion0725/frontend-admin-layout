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
    table: "./src/js/table",
    singin: "./src/js/singin"
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
      chunks: ["vendor", "table"],
      filename: "table.html",
      template: "src/html/table.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "table"],
      filename: "singin.html",
      template: "src/html/singin.html"
    }),
    new ManifestPlugin(),
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
