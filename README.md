# Webpack Typescript
This is a boilerplate code that can get you started for developing applications written in [TypeScript](http://www.typescriptlang.org).

## What's Included?
This boilerplate is designed to be as simplistic as it can be so that you can add more features yourself without much trouble:

- Build with [webpack](https://webpack.js.org) 4
- [SASS](https://sass-lang.com) support
- Separate output files for vendor libraries using webpack's [DLLPlugin](https://webpack.js.org/plugins/dll-plugin)
- [Hot Module Replacement ](https://webpack.js.org/concepts/hot-module-replacement) on the development server
- Linting using [TSLint](https://palantir.github.io/tslint/)
- Unit Testing using [Jest](https://facebook.github.io/jest/)

## What's Not Included?
Since there are a plethora of options out there I would like you to decide for yourself for these kind of stuff:

- Linting CSS/SASS
- Git commit hooks (e.g. must pass unit tests first before allowing push)
- Fancy commit message formats
- Continuous Integration services

I might add these features above into the boilerplate in the future or by popular demand.

## Setup
Clone this repo with your application name as the second argument:
```bash
$ git clone https://github.com/vjcagay/webpack-typescript.git <application-name>
$ cd <application-name>
```

Then delete this repo's git history and initialize a new one.

Afterwards, `npm install` to install the dependencies.

To access the development server, run `npm start` then go to `http://localhost:8080` in your web browser.

## Vendor Libraries/DLL
To make compiles faster, you can separate the vendor libraries from application code by importing them inside `src/ts/dll.ts`. You will still need to import them in your code so that webpack can reference them from the vendor library manifest.

Example:
```typescript
// index.ts
import Vue from "vue";
import router from "vue-router";
const app = new Vue({ router });
```

```typescript
// dll.ts
import "vue";
import "vue-router";
```

Therefore you need to compile the vendor libraries first before your application code. These have been already setup for both the development and production environments so all you need to do is:

```bash
$ # Development: output will be on ./dev folder
$ # Remember: The order matters!
$ npm run compile:development:dll # compile the vendor libraries
$ npm run compile:development:source # compile application code
```

```bash
$ # Production: output will be on ./dist folder
$ # Remember: The order matters!
$ npm run compile:production:dll # compile the vendor libraries
$ npm run compile:production:source # compile application code
```

## Other stuff
- You don't need to run `npm run compile:<environment>:dll` all the time but only when you add/remove libraries on `src/ts/dll.ts`.
- Update `package.json` and modify the necessary fields you need to fit your application.
- Modify `tsconfig.json` to add/remove TypeScript-specific features.

## Contributing
Please file an issue if you find a bug or have concerns or make a pull request if you like some sensible changes!

## Author
© [vjcagay](https://github.com/vjcagay), Released under the [MIT](https://github.com/vjcagay/webpack-typescript/blob/master/LICENSE) license.
