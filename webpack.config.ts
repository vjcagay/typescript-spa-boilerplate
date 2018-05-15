import * as HTMLWebpackPlugin from "html-webpack-plugin";
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
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      inject: "body",
      template: "./src/index.html",
      title: "Webpack TypeScript",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
