/**
 * Don't forget to run the DLL config for WebPack first for correct DLL references
 */
import { Configuration as WebpackConfig } from "webpack";

import devConfig from "./webpack/development";
import prodConfig from "./webpack/production";

const config = (_: any, args: WebpackConfig): WebpackConfig => {
  /* eslint-disable-line */
  /**
   * The common WebPack configuration no matter what environment it is run on
   */
  const commonConfig: WebpackConfig = {
    entry: {
      app: "./src/ts/index.tsx",
    },
    mode: args.mode,
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.tsx?$/,
          loaders: ["ts-loader"],
        },
        {
          test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
          use: "file-loader?name=[name].[ext]",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };

  const additionalConfig = args.mode === "production" ? prodConfig(__dirname) : devConfig(__dirname);

  /**
   * Merge the common configuration with environment-specific ones
   */
  return { ...commonConfig, ...additionalConfig };
};

export default config;
