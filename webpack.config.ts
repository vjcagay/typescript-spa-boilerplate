import { join, resolve } from "path";
import { Configuration as WebpackConfig } from "webpack";

import devConfig from "./webpack/development";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

let config: WebpackConfig = {
  entry: "./src/index.ts",
  mode,
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.ts?$/,
      use: "ts-loader",
    }],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

config = { ...config, ...devConfig(__dirname) };

export default config;
