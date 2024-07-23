// eslint.config.js
export default [
    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        globals: {
          browser: true,
          node: true,
          jest: true,
        },
      },
      rules: {
        quotes: ['error', 'single'],
      },
    },
  ];
  