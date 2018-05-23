import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as HTMLWebpackPlugin from "html-webpack-plugin";
import * as MiniCSSExtractPlugin from "mini-css-extract-plugin";
import * as OptimizeCSSAssetsWebpackPlugin from "optimize-css-assets-webpack-plugin";
import { join } from "path";
import { Configuration } from "webpack";

const config = (dirPath: string): Configuration => {
  return {
    output: {
      filename: "[name].[hash].js",
      path: join(dirPath, "/dist"),
      publicPath: "/",
    },
    plugins: [
      new CleanWebpackPlugin([join(dirPath, "/dist")], {
        root: process.cwd(),
        verbose: true,
      }),
      new MiniCSSExtractPlugin({
        chunkFilename: "[id].[hash].css",
        filename: "[name].[hash].css",
      }),
      new OptimizeCSSAssetsWebpackPlugin({
        canPrint: true,
      }),
      new HTMLWebpackPlugin({
        filename: "index.html",
        inject: "body",
        minify: {
          collapseWhitespace: true,
          html5: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
        },
        template: join(dirPath, "/src/html/index.html"),
        title: "Webpack TypeScript",
      }),
    ],
  };
};

export default config;
