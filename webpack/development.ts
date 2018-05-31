import * as AddAssetHTMLWebpackPlugin from "add-asset-html-webpack-plugin";
import * as HTMLWebpackPlugin from "html-webpack-plugin";
import { join, resolve } from "path";
import { Configuration, DllReferencePlugin, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

const config = (dirPath: string): Configuration => {
  return {
    devServer: ((): DevServerConfig => {
      return {
        contentBase: join(dirPath, "dev"),
        hotOnly: true,
        inline: true,
        publicPath: "/",
      };
    })(),
    devtool: "inline-source-map",
    output: {
      devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]",
      filename: "[name].js",
      path: join(dirPath, "/dev"),
      publicPath: "/",
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new DllReferencePlugin({
        context: ".",
        manifest: resolve(join(dirPath, "/dev/libs-manifest.json")),
      }),
      new AddAssetHTMLWebpackPlugin({
        filepath: resolve(join(dirPath, "/dev/libs.js")),
        publicPath: "./",
      }),
      new HTMLWebpackPlugin({
        filename: "index.html",
        inject: true,
        template: join(dirPath, "/src/html/index.html"),
        title: "Webpack TypeScript",
      }),
    ],
  };
};

export default config;
