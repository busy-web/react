'use strict';

const cjsTransform = require('ember-cli-cjs-transform');
const superagent = require('superagent');

module.exports = {
  name: '@busy-web/react',

  config(env, config) {
    let envDefaults = {
      NODE_ENV: env,
      entry: 'react'
    };

    let APP = Object.assign({}, config.APP);
    let busyWeb = Object.assign({}, APP['busy-web']);
    let react = Object.assign({}, envDefaults, busyWeb.react);

    busyWeb.react = react;
    APP['busy-web'] = busyWeb;
    config.APP = APP;

    return {};
  },

  included: function included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    this.setupOptions(app);
    this.importDependencies();
  },

	setupOptions(app) {
    const options = Object.assign({}, app.options);
    const babel = Object.assign({}, options.babel);

		if (!babel.plugins) {
			babel.plugins = [];
		}

		addPlugin('transform-class-properties', babel);
		addPlugin('transform-object-rest-spread', babel);
    addPlugin('transform-react-jsx', babel);

    if (!app.options) {
      app.options = options;
    }

    app.options.babel = babel;
    this.options = app.options;
  },

	isDevelopingAddon() {
		return true;
  },

  // importTransforms: cjsTransform.importTransforms,

  importDependencies() {
  //   this.import('node_modules/tectonic-superagent/transpiled/index.js', {
  //     using: [{ transformation: 'cjs', as: 'tectonic-superagent', plugins: [ superagent() ] }],
  //     prepend: true
  //   });

  //   this.import('node_modules/tectonic/transpiled/index.js', {
  //     using: [{ transformation: 'cjs', as: 'tectonic' }],
  //     prepend: true
  //   });

  //   this.import({
  //     development: 'node_modules/react-redux/dist/react-redux.js',
  //     production: 'node_modules/react-redux/dist/react-redux.min.js'
  //   }, {
  //     prepend: true
  //   });

	//   this.import({
  //     development: 'node_modules/react-redux/dist/react-redux.js',
  //     production: 'node_modules/react-redux/dist/react-redux.min.js'
  //   }, {
  //     prepend: true
  //   });

	//   this.import({
  //     development: 'node_modules/redux/dist/redux.js',
  //     production: 'node_modules/redux/dist/redux.min.js'
  //   }, {
  //     prepend: true
  //   });

	//   this.import({
  //     development: 'node_modules/redux/dist/redux.js',
  //     production: 'node_modules/redux/dist/redux.min.js'
  //   }, {
  //     prepend: true
  //   });

	//   this.import({
	//     development: 'node_modules/prop-types/prop-types.js',
	//     production: 'node_modules/prop-types/prop-types.min.js'
  //   }, {
  //     prepend: true
  //   });

	//   this.import({
	//     development: 'node_modules/react-dom/umd/react-dom.development.js',
	//     production: 'node_modules/react-dom/umd/react-dom.production.min.js'
  //   }, { prepend: true });

	//   this.import({
	//     development: 'node_modules/react/umd/react.development.js',
	//     production: 'node_modules/react/umd/react.production.min.js'
  //   }, { prepend: true });

		this.import('vendor/shims.js');
  }
};

function addPlugin(name, babel) {
  if (babel.plugins.indexOf(name) === -1) {
    babel.plugins.push(name);
  }
}
