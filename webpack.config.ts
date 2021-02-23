/**
 * Don't forget to run the DLL config for WebPack first for correct DLL references
 */

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import HTMLWebpackTagsPlugin from "html-webpack-tags-plugin";
import { join, resolve } from "path";
import { Configuration, DllReferencePlugin } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

const config = (_env: any, args: any): Configuration => {
  /**
   * The common WebPack configuration no matter what environment it is run on
   */
  const commonConfig: Configuration = {
    entry: {
      app: "./src/ts/index.tsx",
    },
    mode: args.mode || "development",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.tsx?$/i,
          loader: "ts-loader",
        },
        {
          test: /\.(eot|svg|ttf|otf|woff|woff2)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };

  // Config for development
  const devConfig: Configuration = {
    devServer: ((): DevServerConfig => {
      return {
        contentBase: join(__dirname, "dev"),
        host: "0.0.0.0",
        hotOnly: true,
        inline: true,
        publicPath: "/",
      };
    })(),
    devtool: "eval-source-map",
    mode: "development",
    output: {
      // You can use absolute-resource-path if you want to see the full path in the fs
      devtoolModuleFilenameTemplate: "sources://[resource-path]",
      filename: "[name].js",
      path: join(__dirname, "/dev"),
      publicPath: "/",
    },
    plugins: [
      args.env.WEBPACK_SERVE && new ReactRefreshWebpackPlugin(),
      new DllReferencePlugin({
        context: __dirname,
        manifest: resolve(join(__dirname, "/dev/libs-manifest.json")),
      }),
      new HTMLWebpackPlugin({
        filename: "index.html",
        inject: true,
        template: join(__dirname, "/src/html/index.html"),
        title: "Webpack TypeScript",
      }),
      new HTMLWebpackTagsPlugin({
        append: false,
        scripts: ["libs.js"],
        publicPath: "/",
      }),
    ].filter(Boolean),
  };

  // Config for production
  const prodConfig: Configuration = {
    devtool: "source-map",
    output: {
      filename: "[name].[fullhash].js",
      path: join(__dirname, "/dist"),
      publicPath: "/",
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [join(__dirname, "/dist/app.*.*"), join(__dirname, "/dist/styles.*.*")],
        verbose: true,
      }),
      new DllReferencePlugin({
        context: __dirname,
        manifest: resolve(join(__dirname, "/dist/libs-manifest.json")),
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
        template: join(__dirname, "/src/html/index.html"),
        title: "Webpack TypeScript",
      }),
      args.mode === "production" &&
        new HTMLWebpackTagsPlugin({
          append: false,
          scripts: [
            {
              glob: "libs.*.js",
              globPath: join(__dirname, "/dist"),
              path: "./",
            },
          ],
          publicPath: "/",
        }),
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        minRatio: 0.8,
        test: /\.(js|html|css)$/,
        threshold: 10240, // Customize this to the amount you think is big enough to enable compression (in bytes)
      }),
    ].filter(Boolean),
  };

  /**
   * Merge the common configuration with environment-specific ones
   */
  return { ...commonConfig, ...(args.mode === "production" ? prodConfig : devConfig) };
};

export default config;
