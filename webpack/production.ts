import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as HTMLWebpackIncludeAssetsPlugin from "html-webpack-include-assets-plugin";
import * as HTMLWebpackPlugin from "html-webpack-plugin";
import * as MiniCSSExtractPlugin from "mini-css-extract-plugin";
import * as OptimizeCSSAssetsWebpackPlugin from "optimize-css-assets-webpack-plugin";
import { join, resolve } from "path";
import { Configuration, DllReferencePlugin } from "webpack";

const config = (dirPath: string): Configuration => {
  return {
    devtool: "source-map",
    output: {
      filename: "[name].[hash].js",
      path: join(dirPath, "/dist"),
      publicPath: "/",
    },
    plugins: [
      new DllReferencePlugin({
        context: ".",
        manifest: resolve(join(dirPath, "/dist/libs-manifest.json")),
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
      new HTMLWebpackIncludeAssetsPlugin({
        append: false,
        assets: [{
          glob: "libs.*.js",
          globPath: join(dirPath, "/dist"),
          path: "./",
        }],
        publicPath: "/",
      }),
    ],
  };
};

export default config;
