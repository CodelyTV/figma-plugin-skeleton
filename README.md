# 🪆 Figma Plugin Skeleton

Template intended to serve as a starting point if you want to bootstrap a Figma Plugin in TypeScript.

The purpose of this repository is to leave it with the bare minimum dependencies and tools needed to build Figma Plugins but based on software development best practices such as lint and testing tooling already configured 🤟

## Features

- [TypeScript](https://www.typescriptlang.org/) (v4)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
  - [Simple Import Sort](https://github.com/lydell/eslint-plugin-simple-import-sort/)
  - [Import plugin](https://github.com/benmosher/eslint-plugin-import/)
  - And a few other ES2015+ related rules
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)
- [GitHub Action workflows](https://github.com/features/actions) set up to run tests and linting on push
- [SWC](https://swc.rs/): Execute your tests in less than 200ms

## Running the app

- Install the dependencies: `npm install`
- Execute the tests: `npm run test`
- Check linter errors: `npm run lint`
- Fix linter errors: `npm run lint:fix`
- Make a build unifying everything in the same `dist/main.js` file: `npm run build`
- Run a watcher on your plugin files and make the build on every change: `npm run dev`

## Steps to develop your own plugin

1. Click on "Use this template" in order to create your own repository based on this one
2. Clone your repository
3. Replace the skeleton branding by your own:
   - Modify the `name` property of your `manifest.json` file, and set the `id` one following the next steps in order to obtain it from Figma:
     1. Generate a plugin in the Figma App: `Figma menu` > `Plugins` > `Development` > `New Plugin…`
     2. Download the Figma plugin files
     3. Open the downloaded `manifest.json` and copy the `id` property value
   - Modify the following `package.json` properties: `name`, `description`, `repository.url`, `bugs.url`, and `homepage`
4. Remove unnecessary config depending on your plugin type:
   - If your plugin does not have a UI:
     - `manifest.json`: Remove the `ui` property
     - Remove `ui.html` file from the root of the repository
   - If your plugin is not intended to be used with FigJam: `manifest.json`: Remove the `figjam` value from the `editorType` property, leaving the property as an array but only containing the `figma` value
   - If you do not want to test your plugin:
     - `ci.yml`: Remove the `✅ Run tests` step 
     - Remove `tests` folder
     - Remove `jest.config.js` from the root of the repository
     - Remove the Jest dependency: `npm uninstall -D jest` 
     - `package.json`: Remove the `scripts.test` property 
5. Install your plugin in your Figma App: `Figma menu` > `Plugins` > `Development` > `Import plugin from manifest…`
6. Develop in a continuos feedback loop with the watcher (it already takes into account your `tsconfig.json`): `npm run dev`
7. Star this repository 🌟😊
   
☝️ You will find the entrypoint that Figma will execute in the [`src/figma-entrypoint.ts`](src/figma-entrypoint.ts) which is intended to represent the interaction with the Figma UI, leaving the logic of your plugin to the [`src/UseCase.ts`](src/UseCase.ts) class 🤟

## Applied best practices

- Specify proper dependencies version restriction (no wild wildcards `*`)
- Encapsulate all the transpiled code into the `dist` folder
- Encapsulate all the Plugin source code into the `src` folder
- Configure TypeScript through the `tsconfig.json` in order to promote safety a robust contracts (no more `any` paradise)
- Add code style checker with Prettier and ESLint
- Add test suite runner with Jest
- Add Continuous Integration Workflow with GitHub Actions

## Inspiration

Other Figma plugins repositories where we found inspiration to create this one:

- [figma-plugin-typescript-boilerplate](https://github.com/aarongarciah/figma-plugin-typescript-boilerplate)

## Related skeleton templates

Opinionated TypeScript skeletons ready for different purposes:

- [🔷🌱 TypeScript Basic Skeleton](https://github.com/CodelyTV/typescript-basic-skeleton)
- [🔷🕸️ TypeScript Web Skeleton](https://github.com/CodelyTV/typescript-web-skeleton)
- [🔷🌍 TypeScript API Skeleton](https://github.com/CodelyTV/typescript-api-skeleton)
- [🔷✨ TypeScript DDD Skeleton](https://github.com/CodelyTV/typescript-ddd-skeleton)

This very same basic skeleton philosophy implemented in other programming languages:

- [✨ JavaScript Basic Skeleton](https://github.com/CodelyTV/javascript-basic-skeleton)
- [☕ Java Basic Skeleton](https://github.com/CodelyTV/java-basic-skeleton)
- [📍 Kotlin Basic Skeleton](https://github.com/CodelyTV/kotlin-basic-skeleton)
- [🧬 Scala Basic Skeleton](https://github.com/CodelyTV/scala-basic-skeleton)
- [🦈 C# Basic Skeleton](https://github.com/CodelyTV/csharp-basic-skeleton)
- [🐘 PHP Basic Skeleton](https://github.com/CodelyTV/php-basic-skeleton)
