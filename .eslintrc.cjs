module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  rules: {
    'no-global-assign': [
      'error',
      {
        exceptions: ['console'],
      },
    ],
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-extraneous-import': [
      'error',
      {
        allowModules: ['vite'],
      },
    ],
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      rules: {
        'node/no-extraneous-import': 'off',
        'node/no-unpublished-import': 'off',
      },
    },
  ],
};
