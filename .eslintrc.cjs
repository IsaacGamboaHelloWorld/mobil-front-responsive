/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    'no-extra-boolean-cast': 0,
  },

  parserOptions: {
    ecmaVersion: 'latest',
  },
};
