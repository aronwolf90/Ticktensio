module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue',
    'jest'
  ],
  rules: {
  },
  globals: {
    env: 'readonly'
  },
  overrides: [{
    files: ['**/*.spec.js', '**/*.test.js', '**/helper.js'],
    globals: {
      createWrapper: 'readonly',
      entry: 'readonly',
      when: 'readonly',
      associatedEntries: 'readonly',
      dispatch: 'readonly',
      commit: 'readonly',
      relationship: 'readonly',
      collection: 'readonly'
    }
  }],
  ignorePatterns: ['**/dist/**/*.js']
}
