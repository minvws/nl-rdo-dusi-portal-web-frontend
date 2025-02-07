module.exports = {
  "*.{vue,js,ts}": "npm run lint-fix && npm run format",
  "*.{vue}": "npm run type-check"
};
