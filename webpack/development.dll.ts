import * as CleanWebpackPlugin from "clean-webpack-plugin";
import { join } from "path";
import { Configuration, DllPlugin } from "webpack";

const config = (dirPath: string): Configuration => {
  return {
    devtool: "eval-source-map",
    output: {
      filename: "[name].js",
      library: "libs",
      path: join(dirPath, "/dev"),
      publicPath: "/",
    },
    plugins: [
      new CleanWebpackPlugin([join(dirPath, "/dev")], {
        root: process.cwd(),
        verbose: true,
      }),
      new DllPlugin({
        name: "[name]",
        path: join(dirPath, "/dev/[name]-manifest.json"),
      }),
    ],
  };
};

export default config;
