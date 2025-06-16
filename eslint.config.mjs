import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    ...js.configs.recommended,
    ignores: ['dist', 'node_modules', 'build'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        FileReader: 'readonly',
        crypto: 'readonly',
        TextEncoder: 'readonly',
        console: 'readonly',
        alert: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-constant-binary-expression': 'warn',
    },
  },
  prettier,
];
