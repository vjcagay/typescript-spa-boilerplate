import { join } from "path";
import { Configuration } from "webpack";

import devDLLConfig from "./webpack/development.dll";
import prodDLLConfig from "./webpack/production.dll";

const config = (env: any, argv: Configuration): Configuration => {

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

  return { ...commonDLLConfig, ...additionalDLLConfig };
};

export default config;
