/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:@intlify/vue-i18n/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    '@intlify/vue-i18n/no-v-html': 0,
    semi: ['warn', 'never'],
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }
    ],
    'no-debugger': 'off',
    indent: ['warn', 2, { SwitchCase: 1 }],
    quotes: ['warn', 'single'],
    'comma-dangle': [
      'warn',
      {
        imports: 'never',
        exports: 'never',
        functions: 'never',
        arrays: 'never',
        objects: 'never'
      }
    ],
    'array-bracket-spacing': ['warn', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    'template-curly-spacing': ['warn', 'always'],
    'arrow-parens': ['warn', 'as-needed'],
    'keyword-spacing': [
      'warn',
      {
        before: true,
        after: true
      }
    ]
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  }
}
