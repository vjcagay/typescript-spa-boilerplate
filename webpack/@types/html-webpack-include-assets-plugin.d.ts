declare module "html-webpack-include-assets-plugin" {

  import { Plugin } from "webpack";

  namespace AssetsPlugin {
    interface Options {
      append: boolean,
      assets: string | string[] | {},
      cssExtensions?: string | string[],
      files?: string | string[],
      hash?: boolean,
      jsExtensions?: string | string[],
      publicPath?: boolean | string,
    }
  }

  class AssetsPlugin extends Plugin {
    constructor(options: AssetsPlugin.Options);
  }

  export = AssetsPlugin;
}
