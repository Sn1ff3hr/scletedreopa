// eslint.config.js
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['node_modules', 'dist', 'build'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off'
    }
  },
  prettier
];
