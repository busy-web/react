'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');

module.exports = {
  name: '@busy-web/react',

	init() {
		this._super.init && this._super.init.apply(this, arguments);

		this.treePaths.addon = 'app';
		this.treePaths['addon-templates'] = 'app/templates';
		//this.treePaths['addon-styles'] = 'app/styles';

		this.setupOptions();
	},

	config() {
		return { modulePrefix: 'busy-react' };
	},

	setupOptions() {
		this.vendorOpts = {
			reactPath: path.dirname(require.resolve('react')),
			reactDOMPath: path.dirname(require.resolve('react-dom')),
			propTypesPath: path.dirname(require.resolve('prop-types')),
		};

		if (!this.options) {
			this.options = {};
		}

		if (!this.options.babel) {
			this.options.babel = {};
		}

		if (!this.options.babel.plugins) {
			this.options.babel.plugins = [];
		}

		function addPlugin(name) {
			if (this.options.babel.plugins.indexOf(name) === -1) {
				this.options.babel.plugins.push(name);
			}
		}

		addPlugin.call(this, 'transform-class-properties');
		addPlugin.call(this, 'transform-object-rest-spread');
		addPlugin.call(this, 'transform-react-jsx');
	},

	importDependencies() {
		this.import({
			development: 'vendor/prop-types/prop-types.js',
			production: 'vendor/prop-types/prop-types.min.js'
		}, { prepend: true });

		this.import({
			development: 'vendor/react-dom/umd/react-dom.development.js',
			production: 'vendor/react-dom/umd/react-dom.production.min.js'
		}, { prepend: true });

		this.import({
			development: 'vendor/react/umd/react.development.js',
			production: 'vendor/react/umd/react.production.min.js'
		}, { prepend: true });
	},

	isDevelopingAddon() {
		return true;
	},

	treeForVendor(vendorTree) {
		let trees = [];
    let options = this.vendorOpts;

    if (vendorTree) {
      trees.push(vendorTree);
		}

		trees.push(
			funnel(options.reactPath, {
        destDir: 'react',
        include: [new RegExp(/\.js$/)],
        exclude: ['tests', 'ender', 'package']
					.map(key => new RegExp(key + '.js$'))
      })
    );

		trees.push(
			funnel(options.reactDOMPath, {
        destDir: 'react',
        include: [new RegExp(/\.js$/)],
        exclude: ['tests', 'ender', 'package']
					.map(key => new RegExp(key + '.js$'))
      })
    );

		trees.push(
			funnel(options.propTypesPath, {
        destDir: 'react',
        include: [new RegExp(/\.js$/)],
        exclude: ['tests', 'ender', 'package']
					.map(key => new RegExp(key + '.js$'))
      })
		);

		return mergeTrees(trees);
	}
};
