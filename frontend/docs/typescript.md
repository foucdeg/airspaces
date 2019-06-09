# Typescript

Typescript is already installed and configured when generating a project with a javascript front.

## Installation and basic configuration

- Install typescript
  `yarn add --dev typescript`

- Install basic type definitions (pick what you need) which are not bundled with the dependencies on your project. All these types are referenced [here](https://github.com/DefinitelyTyped/DefinitelyTyped)

```js
yarn add --dev
    @types/cheerio
    @types/enzyme
    @types/history
    @types/jest
    @types/lodash
    @types/node
    @types/react
    @types/react-dom
    @types/react-intl
    @types/react-redux
    @types/react-router
    @types/react-router-dom
    @types/react-test-renderer
    @types/styled-components
    @types/superagent
    @types/webpack-env
```

- Create basic Typescript config by copying [tsconfig.json](../tsconfig.json) and [tsconfig.paths.json](../tsconfig.paths.json)
  - The `"extends": "./tsconfig.paths.json"` line lets you specify absolute paths in imports, referenced [here](https://github.com/facebook/create-react-app/issues/5645). You may only need it if you used create-react-app.
  - The `"skipLibCheck": true` line fixes a typing conflict between cypress and jest, rererenced [here](https://github.com/cypress-io/cypress/issues/1087)

## Linter

- The project uses ESLINT to lint TypeScript code. If you want more information about the configuration, visit the [Linter and Editor Configuration](./docs/linter-editor.md) page.

## Some conventions

- A Typescript file with JSX needs to have a .tsx extension (contrary to javascript where it is not necessary)
- Otherwise the extension should be .ts
