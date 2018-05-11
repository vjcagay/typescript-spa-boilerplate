import { resolve } from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.ts?$/,
      use: "ts-loader",
    }],
  },
  output: {
    filename: "app.js",
    path: resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
