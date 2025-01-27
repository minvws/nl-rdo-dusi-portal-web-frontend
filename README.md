# Dus-i Burgerportaal

This directory contains the new front-end for the Dus-i Burgerportaal.

## Recommended IDE Setup

The recommended setup for developing this project is using [Visual Studio
Code](https://code.visualstudio.com/). The following extensions are recommended:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
  disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

The project is built using [Vite](https://vitejs.dev/). It uses [Vue 3](https://v3.vuejs.org/) and [TypeScript](https://www.typescriptlang.org/).

With Vue 3 we use the [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html).
For styling we use the [Rijksoverheid Theme](https://github.com/minvws/nl-rdo-rijksoverheid-ui-theme) to ensure it matches the Rijksoverheid design language.

## Folder structure

The project is structured as follows:

```sh
.
├── .github
│   ├── ISSUE_TEMPLATE
│   ├── workflows
│   ├── CODEOWNERS
│   └── dependabot.yml
├── .husky
│   ├── _
│   └── pre-commit
├── mock
│   ├── portal
│   ├── assessment
│   └── shared
├── public
│   ├── assets
│   ├── icons
│   ├── img
│   ├── config.js
│   └── site.webmanifest
├── src
│   ├── @shared
│   ├── assessment
│   ├── portal
│   └── main.ts
├── .editorconfig
├── .env
├── .env.example
├── .gitignore
├── .lintstagedrc.js
├── .nvmrc
├── .prettierrc.json
├── env.d.ts
├── index.html
├── init.sh
├── package-lock.json
├── package.json
├── README.md
├── run.sh
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Within the `src` folder, the following structure is used:

```sh
.
└── src
    ├── @shared
    ├── assessment
    └── portal
```

The `@shared` folder contains shared all shared components, types, etc. The
`assessment` and `portal` folders contain the components, types, etc. for the
assessment and portal projects respectively.

### Install dependencies

Before you can start developing, you need to install the dependencies. You can
do this by running the following command in the root of the project:

```sh
npm ci --no-audit --no-fund
```

_Note: the flags speed up the install process._

**In case you see this error:**

```sh
npm ERR! code E401
npm ERR! 401 Unauthorized - GET https://npm.pkg.github.com/download/@minvws/nl-rdo-rijksoverheid-ui-theme/0.0.14/a308d2dc00f49516a605f0d499b5ec8c45bbb13b - authentication token not provide
```

Reason: you do not have a token to access the nl-rdo-rijksoverheid-ui-theme package

Solution: create a (classic) personal access token in Github with `read:packages` and register it in your computer.

How to to that: see <https://github.com/minvws/nl-rdo-dusi-coordination/tree/main/development#authentication>

### Environment variables

The project uses environment variables to configure the application. You can
find the available variables in the `.env.example` file.
To use these variables, you need to create a `.env` file in the root of
the project. You can copy the `.env.example` file and rename it to `.env`.

### Available scripts

After installing the dependencies, the following scripts are available:

| Script           | Description                                   |
| ---------------- | --------------------------------------------- |
| build-only       | Builds Vite                                   |
| build:portal     | Production build of the 'portal' project      |
| build:assessment | Production build of the 'assessment' project  |
| dev:portal       | Development build of the 'portal' project     |
| dev:assessment   | Development build of the 'assessment' project |
| format           | Formats source code                           |
| lint             | Lints source code                             |
| lint-fix         | Lints and auto-fixes source code              |
| prepare          | Installs Husky Git during install             |
| test             | Runs unit tests                               |
| type-check       | Perform type checking                         |

~Note: There are also `init.sh` and `run.sh` executable scripts available in
the root of the project.~

## License

This repository follows the [REUSE Specification v3.3](https://reuse.software/spec-3.3/). Please see [LICENSE.md](./LICENSE.md), [REUSE.toml](./REUSE.toml), [LICENSES/](./LICENSES/), and the individual `*.license` files (if any).
