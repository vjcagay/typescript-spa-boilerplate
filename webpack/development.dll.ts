import { CleanWebpackPlugin } from "clean-webpack-plugin";
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
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [join(dirPath, "/dev")],
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
