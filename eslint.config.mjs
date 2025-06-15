const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        // For browser context
        document: 'readonly',
        alert: 'readonly',
        window: 'readonly',
        crypto: 'readonly',
        FileReader: 'readonly',
        TextEncoder: 'readonly',
        console: 'readonly',

        // For Jest (test files)
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly'
      }
    },
    ignores: ['node_modules', 'dist', 'build'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-constant-binary-expression': 'warn'
    }
  },
  prettier
];

