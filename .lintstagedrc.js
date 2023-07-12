module.exports = {
  "*.{vue,js,ts}": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
  "*.{vue}": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false"
};
