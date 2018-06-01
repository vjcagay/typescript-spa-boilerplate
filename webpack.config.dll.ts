/**
 * This WebPack configuration is used to compile Dynamic-Linked Libraries (DLLs) or simply vendor source code.
 * Since DLLs don't usually change much compared to your app's source code, removing them in your build step
 * significantly decreases compile time.
 *
 * Make sure to run this because compiling your app's source code when you modify DLL's such as adding/removing
 * 3rd-party libraries.
 */

import { join } from "path";
import { Configuration } from "webpack";

import devDLLConfig from "./webpack/development.dll";
import prodDLLConfig from "./webpack/production.dll";

const config = (env: any, argv: Configuration): Configuration => {
  /**
   * The common WebPack configuration no matter what environment it is run on
   */
  const commonDLLConfig: Configuration = {
    devtool: "inline-source-map",
    entry: {
      libs: ["./src/ts/dll.ts"], // You can replace it with an array of dlls or imports of libraries
    },
    mode: argv.mode,
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: "ts-loader",
      }],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".sass", ".css"],
    },
  };

  const additionalDLLConfig = argv.mode === "production" ? prodDLLConfig(__dirname) : devDLLConfig(__dirname);

  /**
   * Merge the common configuration with environment-specific ones
   */
  return { ...commonDLLConfig, ...additionalDLLConfig };
};

export default config;
