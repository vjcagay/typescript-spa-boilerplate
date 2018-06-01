import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as CompressionWebpackPlugin from "compression-webpack-plugin";
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
      new CleanWebpackPlugin([join(dirPath, "/dist/app.*.*"), join(dirPath, "/dist/styles.*.*")], {
        root: process.cwd(),
        verbose: true,
      }),
      new DllReferencePlugin({
        context: ".",
        manifest: resolve(join(dirPath, "/dist/libs-manifest.json")),
      }),
      new MiniCSSExtractPlugin({
        chunkFilename: "[id].[hash].css",
        filename: "styles.[hash].css",
      }),
      new OptimizeCSSAssetsWebpackPlugin({
        canPrint: true,
        cssProcessorOptions: { // By default this is cssnano
          map: {
            inline: false, // Setting this to false if you want to have css-loader/sass-loader produce source-maps
          },
        },
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
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        asset: "[path].gz[query]",
        minRatio: 0.8,
        test: /\.(js|html|css)$/,
        threshold: 10240, // Customize this to the amount you think is big enough to enable compression (in bytes)
      }),
    ],
  };
};

export default config;
