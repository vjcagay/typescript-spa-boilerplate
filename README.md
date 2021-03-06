# TypeScript SPA Boilerplate

This is a boilerplate code that can get you started for developing applications written in [TypeScript](http://www.typescriptlang.org).

## Rationale

Sure, there are more powerful boilerplate generators out there such as [Create React app](https://create-react-app.dev/) and [Vue CLI](https://cli.vuejs.org/). But trying to configure your pipeline outside of what these tools are intended to do can be a pain and requires "ejection". I created this project for my own usage (and for you as well) for a much simpler and opinionated way of building app frontends.

## What's Included?

This boilerplate is designed to be as simplistic as it can be so that you can add more features yourself without much trouble:

- Build with [WebPack](https://webpack.js.org) 5
- [Styled-Components](https://www.styled-components.com) support
- Separate output files for vendor libraries using webpack's [DLLPlugin](https://webpack.js.org/plugins/dll-plugin)
- [Hot Module Replacement ](https://webpack.js.org/concepts/hot-module-replacement) on the development server
- Linting using [ESLint](https://eslint.org)
- Unit Testing using [Jest](https://facebook.github.io/jest/)

## Setup

> The instructions assume that you use NPM as your package manager. Feel free to use other package managers such as Yarn or PNPM.

Clone this repo with your application name as the second argument:

```bash
$ git clone https://github.com/vjcagay/typescript-spa-boilerplate.git <application-name>
$ cd <application-name>
```

Then delete this repo's git history and initialize a new one.

Afterwards, `npm install` to install the dependencies.

To access the development server, run `npm start` then go to `http://0.0.0.0:8080` in your web browser.

## Making compiles faster using DLL

To make compiles faster, you can separate the vendor libraries from application code by importing them inside `src/ts/dll.ts`. You will still need to import them in your code so that WebPack can reference them from the vendor library manifest.

Example:

```typescript
// index.tsx
import React from "react";
import styled from "styled-components";
```

```typescript
// dll.ts
import "react";
import "styled-components";
```

Therefore you need to compile the vendor libraries first before the application code:

```bash
$ # Development mode. The order matters here.
$ npm run dll # compile the vendor libraries
$ npm start # start the dev server
```

To compile for releasing in production:

```bash
$ # Normally you do this in CI instead of local machine
$ npm run dll -- --mode=production
$ npm run source -- --mode=production
```

## Notes

- You don't need to run `npm run dll` all the time but only when you add/remove libraries on `src/ts/dll.ts`.
- Update `package.json` and modify the necessary fields you need to fit your application.
- Modify `tsconfig.json` to add/remove TypeScript-specific features.

## For Visual Studio Code Users

To enable ESLint for TypeScript files, configure the plugin to:

```json
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
```

## Contributing

Please file an issue if you find a bug or have concerns or make a pull request if you like some sensible changes!

## Author

© [vjcagay](https://github.com/vjcagay), Released under the [MIT](https://github.com/vjcagay/typescript-spa-boilerplate/blob/master/LICENSE) license.
