/**
 * Don't forget to run the DLL config for WebPack first for correct DLL references
 */
import * as AutoPrefixer from "autoprefixer";
import { loader as MiniCssExtractPluginLoader } from "mini-css-extract-plugin";
import { Configuration as WebpackConfig } from "webpack";

import devConfig from "./webpack/development";
import prodConfig from "./webpack/production";

const config = (env: any, argv: WebpackConfig): WebpackConfig => {
  /**
   * The common WebPack configuration no matter what environment it is run on
   */
  const commonConfig: WebpackConfig = {
    entry: {
      app: "./src/ts/index.ts",
    },
    mode: argv.mode,
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: "ts-loader", // Change to loader: "ts-loader" if you need to pass options
      }, {
        test: /\.scss$/,
        use: [
          argv.mode === "production" ? MiniCssExtractPluginLoader : "style-loader",
          "css-loader?sourceMap",
          { loader: "postcss-loader", options: { plugins: [AutoPrefixer] } },
          "sass-loader?sourceMap",
        ],
      }, {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        use: "file-loader?name=[name].[ext]",
      }],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };

  const additionalConfig = argv.mode === "production" ? prodConfig(__dirname) : devConfig(__dirname);

  /**
   * Merge the common configuration with environment-specific ones
   */
  return { ...commonConfig, ...additionalConfig };
};

export default config;
