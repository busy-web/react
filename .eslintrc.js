module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
		emcaFeatures: {
			jsx: true
		}
  },
  plugins: [
		'babel',
    'ember',
		'react'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
		'plugin:react/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
		'react/jsx-uses-react': 2,
		'react/jsx-uses-vars': 2
  },
  overrides: [
    // node files
    {
      files: [
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'app/**',
        'addon/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        "node/no-unpublished-require": false,
        "node/no-missing-require": false
      })
    }
  ]
};
