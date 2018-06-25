'use strict';

module.exports = {
  name: '@busy-web/react',

  isDevelopingAddon() {
    if (this.env === 'development') {
      return true;
    }
  },

  config(env, config) {
    process.env.NODE_ENV = env;

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
    this.env = app.env;
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    this.setupOptions(app);
  },

	setupOptions(app) {
    const options = Object.assign({}, app.options);
    const babel = Object.assign({}, options.babel);

		if (!babel.plugins) {
			babel.plugins = [];
		}

		addPlugin('transform-class-properties', babel);
		addPlugin('transform-decorators-legacy', babel);
		addPlugin('transform-object-rest-spread', babel);
    addPlugin('transform-react-jsx', babel);

    if (!app.options) {
      app.options = options;
    }

    app.options.babel = babel;
    this.options = Object.assign({}, this.options, { babel });
  }
};

function addPlugin(name, babel) {
  if (babel.plugins.indexOf(name) === -1) {
    babel.plugins.push(name);
  }
}
