module.exports = {
  env: {
    // browser: true,
    node: true,
    commonjs: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    // 'no-console': 'off',
    'no-console': ['warn', {
      allow: ['warn', 'error', 'info']
    }],
    'no-tabs': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    'no-delete-var': 2,
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false
      }
    ]

  }
}
