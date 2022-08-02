/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    ui: "./src/ui/ui.ts",
    figmaEntrypoint: "./src/figma-entrypoint.ts",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },

      // Enables including CSS by doing `import './file.css'` in your TypeScript code
      { test: /\.css$/, use: ["style-loader", "css-loader"] },

      // Allows you to use `<%= require('./file.svg') %>` in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|svg|webp)$/, type: "asset/inline" },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },

  // Tells Webpack to generate `ui.html` and to inline `ui.ts` into it
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/ui/ui.html",
      filename: "ui.html",
      inlineSource: ".(js)$",
      chunks: ["ui"],
    }),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/ui.js/],
      htmlMatchPattern: [/ui.html/],
    }),
  ],
};
