import * as HTMLWebpackIncludeAssetsPlugin from "html-webpack-include-assets-plugin";
import * as HTMLWebpackPlugin from "html-webpack-plugin";
import { join, resolve } from "path";
import { Configuration, DllReferencePlugin, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

const config = (dirPath: string): Configuration => {
  return {
    devServer: ((): DevServerConfig => {
      return {
        contentBase: join(dirPath, "dev"),
        host: "0.0.0.0",
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
      new HTMLWebpackPlugin({
        filename: "index.html",
        inject: true,
        template: join(dirPath, "/src/html/index.html"),
        title: "Webpack TypeScript",
      }),
      new HTMLWebpackIncludeAssetsPlugin({
        append: false,
        assets: ["libs.js"],
        publicPath: "/",
      }),
    ],
  };
};

export default config;
