import { loader as miniCssLoader } from "mini-css-extract-plugin";
import { Configuration as WebpackConfig } from "webpack";

import devConfig from "./webpack/development";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

let config: WebpackConfig = {
  entry: "./src/ts/index.ts",
  mode,
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.ts?$/,
      use: "ts-loader",
    }, {
      test: /\.scss$/,
      use: [mode === "production" ? miniCssLoader : "style-loader", "css-loader", "sass-loader"],
    }],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

config = { ...config, ...devConfig(__dirname) };

export default config;
