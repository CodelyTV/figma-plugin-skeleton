/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  devtool: false,
  experiments: {
    topLevelAwait: true,
  },
  entry: {
    ui: "./src/ui/ui.ts",
    figmaEntrypoint: "./src/figma-entrypoint.ts",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ }],
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
