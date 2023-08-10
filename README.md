# Dus-i Burgerportaal

This directory contains the new front-end for the Dus-i Burgerportaal.

## Recommended IDE Setup

The recommended setup for developing this project is using [Visual Studio
Code](https://code.visualstudio.com/). The following extensions are recommended:
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

The project is built using [Vite](https://vitejs.dev/). It uses [Vue 3]
(https://v3.vuejs.org/) and [TypeScript](https://www.typescriptlang.org/).
[Storybook](https://storybook.js.org/) is available for component development and
[Cypress](https://www.cypress.io/) for end-to-end testing.

With Vue 3 we use the [Composition API]
(https://v3.vuejs.org/guide/composition-api-introduction.html).
For styling we use the [Rijksoverheid Theme]
(https://github.com/minvws/nl-rdo-rijksoverheid-ui-theme) to ensure it matches
the Rijksoverheid design language.

Before you can start developing, you need to install the dependencies. You can
do this by running the following command in the root of the project:

### Install dependencies

```sh
npm ci --no-audit --no-fund
```
~Note: the flags speed up the install process.~

### Environment variables

The project uses environment variables to configure the application. You can
find the available variables in the `.env.example` file.
To use these variables, you need to create a `.env` file in the root of
the project. You can copy the `.env.example` file and rename it to `.env`.

### Available scripts

After installing the dependencies, the following scripts are available:

| Script        | Description |
|---------------|------------ |
| build-only    | Builds Vite |
| build-storybook| Builds the production version of Storybook |
| build         | Builds the production version of the project |
| dev           | Builds the development version of the project |
| format        | Formats source code |
| lint          | Lints source code |
| lint-fix      | Lints and auto-fixes source code |
| prepare       | Installs Husky Git during install |
| storybook     | Builds the development version of Storybook |
| test:e2e      | Runs end-to-end tests |
| test:unit     | Runs unit tests |
| type-check    | Perform type checking |

~Note: There are also `init.sh` and `run.sh` executable scripts available in the root of the project.~
