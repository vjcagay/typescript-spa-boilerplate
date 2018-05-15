import * as HTMLWebpackPlugin from "html-webpack-plugin";
import { join, resolve } from "path";
import { Configuration as WebpackConfig, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

const config: WebpackConfig = {
  devServer: ((): DevServerConfig => {
    return {
      contentBase: join(__dirname, "dist"),
      hotOnly: true,
      inline: true,
    };
  })(),
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.ts?$/,
      use: "ts-loader",
    }],
  },
  output: {
    filename: "app.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      inject: "body",
      template: "./src/index.html",
      title: "Webpack TypeScript",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default config;
