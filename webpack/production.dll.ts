import * as CleanWebpackPlugin from "clean-webpack-plugin";
import { join } from "path";
import { Configuration, DllPlugin } from "webpack";

const config = (dirPath: string): Configuration => {
  return {
    devtool: "source-map",
    output: {
      filename: "[name].[hash].js",
      library: "[name]",
      path: join(dirPath, "/dist"),
    },
    plugins: [
      new CleanWebpackPlugin([join(dirPath, "/dist")], {
        root: process.cwd(),
        verbose: true,
      }),
      new DllPlugin({
        name: "[name]",
        path: join(dirPath, "/dist/[name]-manifest.json"),
      }),
    ],
  };
};

export default config;
