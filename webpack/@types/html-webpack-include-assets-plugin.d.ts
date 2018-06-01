declare module "html-webpack-include-assets-plugin" {

  import { Plugin } from "webpack";

  namespace AssetsPlugin {
    interface Options {
      /**
       * Specifying whether the assets should be prepended (false) before any existing assets, or appended (true) after
       * them.
       */
      append: boolean,
      /**
       * Assets that will be output into your `html-webpack-plugin` template.
       *
       * To specify just one asset, simply pass a string or object.
       * To specify multiple, pass an array of strings or objects.
       *
       * If the asset path is static and ends in one of the `jsExtensions` or `cssExtensions` values, simply use a
       * string value.
       *
       * If the asset is not static or does not have a valid extension, you can instead pass an object with properties
       * `path` (required) and `type` or `glob` or `globPath` or `attributes` (optional). In this case path is the asset
       * href/src, `type` is one of `js` or `css`, and `glob` is a wildcard to use to match all files in the path (uses
       * the {@link https://github.com/isaacs/node-glob glob} package). The `globPath` can be used to specify the
       * directory from which the `glob` should search for filename matches (the default is to use path within webpack's
       * output directory).
       *
       * The `attributes` property may be used to add additional attributes to the link or script element that is
       * injected. The keys of this object are attribute names and the values are the attribute values.
       */
      assets: string | (string |
        { path: string, type?: string, glob?: string, globPath?: string, attributes?: string})[],
      /**
       * Specifies the file extensions to use to determine if assets are style assets. Default is `.css`.
       */
      cssExtensions?: string | string[],
      /**
       * Files that the assets will be added to.

       * By default the assets will be included in all files. If files are defined, the assets will only be included in
       * specified file globs (uses the {@link https://github.com/isaacs/minimatch minimatch} package).
       */
      files?: string | string[],
      /**
       * Specifying whether the assets should be appended with webpack's compilation hash. This is useful for cache
       * busting. Default is false.
       */
      hash?: boolean,
      /**
       * Specifies the file extensions to use to determine if assets are script assets. Default is `.js`.
       */
      jsExtensions?: string | string[],
      /**
       * Specifying whether the assets should be prepended with webpack's public path or a custom publicPath (string).
       *
       * A value of false may be used to disable prefixing with webpack's publicPath, or a value like `myPublicPath/`
       * may be used to prefix all assets with the given string. Default is `true`.
       */
      publicPath?: boolean | string,
    }
  }

  class AssetsPlugin extends Plugin {
    constructor(options: AssetsPlugin.Options);
  }

  export = AssetsPlugin;
}
