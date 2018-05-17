import * as HTMLWebpackPlugin from "html-webpack-plugin";
import { join } from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

const config = (dirPath: string): Configuration => {
  return {
    devServer: ((): DevServerConfig => {
      return {
        contentBase: join(__dirname, "dist"),
        hotOnly: true,
        inline: true,
        publicPath: "/",
      };
    })(),
    devtool: "inline-source-map",
    output: {
      devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]",
      filename: "[name].js",
      path: join(dirPath, "dev"),
      publicPath: "/",
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new HTMLWebpackPlugin({
        filename: "index.html",
        inject: "body",
        template: join(dirPath, "/src/index.html"),
        title: "Webpack TypeScript",
      }),
    ],
  };
};

export default config;
