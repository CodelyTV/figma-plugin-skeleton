// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  mode: "production",
  devtool: false,
  entry: "./src/figma-entrypoint.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }],
  },
};
