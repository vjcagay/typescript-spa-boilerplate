import HTMLWebpackPlugin from "html-webpack-plugin";
import HTMLWebpackTagsPlugin from "html-webpack-tags-plugin";
import { join, resolve } from "path";
import {
  Configuration,
  DevtoolModuleFilenameTemplateInfo,
  DllReferencePlugin,
  HotModuleReplacementPlugin,
} from "webpack";
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
    devtool: "eval-source-map",
    output: {
      // You might need to modify this to suit your own environments
      devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]",
      devtoolModuleFilenameTemplate: (info: DevtoolModuleFilenameTemplateInfo) => `sources://${info.resourcePath}`,
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
      new HTMLWebpackTagsPlugin({
        append: false,
        scripts: ["libs.js"],
        publicPath: "/",
      }),
    ],
  };
};

export default config;
