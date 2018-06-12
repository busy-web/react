'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');

// function SASSPlugin(optionsFn) {
//   this.name = '@busy-web/react';
//   this.optionsFn = optionsFn;
//   this.ext = ['js', 'jsx'];
// }

// ReactPlugin.prototype.toTree = function(tree, inputPath, outputPath, inputOptions) {
//   var options = Object.assign({}, this.optionsFn(), inputOptions);
//   var inputTrees;

//   if (options.onlyIncluded) {
//     inputTrees = [new Funnel(tree, {
//       include: ['app/react/**/*'],
//       annotation: 'Funnel (styles)'
//     })];
//   }
//   else {
//     inputTrees = [tree];
//   }

//   if (options.includePaths) {
//     inputTrees = inputTrees.concat(options.includePaths);
//   }

//   var ext = options.extension || 'js';
//   var paths = options.outputPaths;
//   var trees = Object.keys(paths).map(function(file) {
//     var input = path.join(inputPath, file + '.' + ext);
//     var output = paths[file];
//     return new SassCompiler(inputTrees, input, output, options);
//   });

//   return mergeTrees(trees);
// };

module.exports = {
  name: '@busy-web/react',

	init() {
		this._super.init && this._super.init.apply(this, arguments);

    //this.treePaths.addon = 'app';
    //this.treePaths['addon-templates'] = 'app/templates';
		//this.treePaths['addon-styles'] = 'app/styles';

		this.setupOptions();
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

  // setupPreprocessorRegistry: function(type, registry) {
  //   registry.add('css', new SASSPlugin(this.sassOptions.bind(this)));

  //   // prevent conflict with broccoli-sass if it's installed
  //   if (registry.remove) registry.remove('css', 'broccoli-sass');
  // },

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
        destDir: 'react-dom',
        include: [new RegExp(/\.js$/)],
        exclude: ['tests', 'ender', 'package']
					.map(key => new RegExp(key + '.js$'))
      })
    );

		trees.push(
			funnel(options.propTypesPath, {
        destDir: 'prop-types',
        include: [new RegExp(/\.js$/)],
        exclude: ['tests', 'ender', 'package']
					.map(key => new RegExp(key + '.js$'))
      })
		);

		return mergeTrees(trees);
	}
};
