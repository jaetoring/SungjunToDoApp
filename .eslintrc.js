module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json', // Needed for rules that require type info
      sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    rules: {
      // custom rules here, for example:
      '@typescript-eslint/no-unused-vars': ['warn'],
    }
  };