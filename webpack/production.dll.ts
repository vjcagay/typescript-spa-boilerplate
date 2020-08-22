import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import { join } from "path";
import { Configuration, DllPlugin } from "webpack";

const config = (dirPath: string): Configuration => {
  return {
    devtool: "source-map",
    output: {
      filename: "[name].[hash].js",
      library: "libs",
      path: join(dirPath, "/dist"),
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [join(dirPath, "/dist/")],
        verbose: true,
      }),
      new DllPlugin({
        name: "[name]",
        path: join(dirPath, "/dist/[name]-manifest.json"),
      }),
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        minRatio: 0.8,
        test: /\.(js|html|css)$/,
        threshold: 10240, // Customize this to the amount you think is big enough to enable compression (in bytes)
      }),
    ],
  };
};

export default config;
