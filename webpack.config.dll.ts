import { join } from "path";
import { Configuration, DefinePlugin, DllPlugin, optimize } from "webpack";

const config: Configuration = {
  devtool: "inline-source-map",
  entry: {
    libs: ["./src/ts/dll.ts"], // You can replace it with an array of dlls or imports of libraries
  },
  mode: "development",
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.ts?$/,
      use: "ts-loader",
    }],
  },
  output: {
    filename: "[name].js",
    library: "[name]",
    path: join(__dirname, "./dev"),
  },
  plugins: [
    new DllPlugin({
      name: "[name]",
      path: join(__dirname, "./dev/[name]-manifest.json"),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".sass", ".css"],
  },
};

export default config;
