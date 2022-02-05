/**
 * This WebPack configuration is used to compile Dynamic-Linked Libraries (DLLs) or simply vendor source code.
 * Since DLLs don't usually change much compared to your app's source code, removing them in your build step
 * significantly decreases compile time.
 *
 * Make sure to run this because compiling your app's source code when you modify DLL's such as adding/removing
 * 3rd-party libraries.
 */

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import { join } from "path";
import { Configuration, DllPlugin } from "webpack";

const config = (_env: any, args: any): Configuration => {
  /**
   * The common WebPack configuration no matter what environment it is run on
   */
  const commonConfig: Configuration = {
    devtool: "inline-source-map",
    entry: {
      libs: ["./src/ts/dll.ts"], // Array of dlls or imports of libraries
    },
    mode: args.mode || "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.ts?$/i,
          loader: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };

  // Config for development
  const devConfig: Configuration = {
    devtool: "eval-source-map",
    output: {
      filename: "[name].js",
      library: "libs",
      path: join(__dirname, "/dev"),
      publicPath: "/",
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [join(__dirname, "/dev")],
        verbose: true,
      }),
      new DllPlugin({
        name: "[name]",
        path: join(__dirname, "/dev/[name]-manifest.json"),
      }),
    ],
  };

  // Config for production
  const prodConfig: Configuration = {
    devtool: "source-map",
    output: {
      filename: "[name].[fullhash].js",
      library: "libs",
      path: join(__dirname, "/build"),
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [join(__dirname, "/build/")],
        verbose: true,
      }),
      new DllPlugin({
        name: "[name]",
        path: join(__dirname, "/build/[name]-manifest.json"),
      }),
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        minRatio: 0.8,
        test: /\.(js|html|css)$/,
        threshold: 10240, // Customize this to the amount you think is big enough to enable compression (in bytes)
      }),
    ],
  };

  /**
   * Merge the common configuration with environment-specific ones
   */
  return { ...commonConfig, ...(args.mode === "production" ? prodConfig : devConfig) };
};

export default config;
