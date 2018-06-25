/**
 * @module Component
 *
 */
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { isEmpty } from '@ember/utils';
import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';
import { assign } from '@ember/polyfills';
import ReactDom from 'react-dom';
import createApp from './../app';
import reactDataParser from '@busy-web/react/utils/react-data-parser';
import lookupReact from '@busy-web/react/utils/lookup-react';

/**
 * Component helper for mounting a React Component Tree
 *
 */
export default Component.extend({
	classNames: ['br-component'],

	name: '',
	model: null,

	auth: service(),
	store: service(),

	__state__: null,
	__reactName__: '',

	layout: hbs("{{#if __reactName__}}{{component __reactName__ model=this.__state__}}{{/if}}"),

	init() {
		this._super(...arguments);

		assert("name is a required prop for {{busy-react name='' model=object}}", !isEmpty(this.get('name')));

		// get required name and format the string
		const name = dasherize(this.get('name'));

		// get component owner object
		const owner = getOwner(this);

		// create dynamic component
		const component = ReactComponent.extend({ name });

		// create new component react name
		const reactName = `br-${name}`;

		// save component name
    this.set('__reactName__', reactName);

    // register new component to be loaded if it was not already loaded
    let rc = owner.factoryFor(`component:${reactName}`);
    if (!(rc && rc.class)) {
      owner.register(`component:${reactName}`, component);
    }

		// get model data
    const model = this.get('model');
    const modelData = reactDataParser(model, this.__state__);

		// store state for immutable updates
		this.__state__ = assign({}, modelData);
  }
});

/**
 * dynamic react component loader
 *
 */
const ReactComponent = Component.extend({
	name: null,
	model: null,

  layout: hbs("<div></div>"),

	/**
	 * render new react component into ember DOM
	 *
	 * @private
	 * @method renderJSX
	 */
	renderJSX() {
		const name = this.get('name').replace(/\./g, '/');
		const model = this.get('model');
    const component = lookupReact(this, `mount:${name}`);
    return createApp(component, model);
    //return React.createElement(App, { reactClass: component, model }, null);
	},

	/**
	 * mount component
	 */
	didInsertElement() {
		this._super(...arguments);
		ReactDom.render(this.renderJSX(), this.element);
	},

	/**
	 * unmount component
	 */
	willDestroyComponent() {
		this._super(...arguments);
		ReactDom.unmountComponentAtNode(this.element);
	}
});
