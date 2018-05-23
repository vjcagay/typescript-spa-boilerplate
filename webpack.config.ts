import { loader as MiniCssExtractPluginLoader } from "mini-css-extract-plugin";
import { Configuration as WebpackConfig } from "webpack";

import devConfig from "./webpack/development";
import prodConfig from "./webpack/production";

const config = (env: any, argv: WebpackConfig): WebpackConfig => {
  const commonConfig: WebpackConfig = {
    entry: "./src/ts/index.ts",
    mode: argv.mode,
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: "ts-loader",
      }, {
        test: /\.scss$/,
        use: [argv.mode === "production" ? MiniCssExtractPluginLoader : "style-loader", "css-loader", "sass-loader"],
      }],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };

  const additionalConfig = argv.mode === "production" ? prodConfig(__dirname) : devConfig(__dirname);

  return { ...commonConfig, ...additionalConfig };
};

export default config;
