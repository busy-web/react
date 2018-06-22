/**
 * @module Component
 *
 */
//import DS from 'ember-data';
import hbs from 'htmlbars-inline-precompile';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
//import { get, observer } from '@ember/object';
import { getOwner } from '@ember/application';
import { /*isNone,*/ isEmpty } from '@ember/utils';
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

    // // init state object
		// if (isNone(this.__state__)) {
		//   this.__state__ = {};
		// }

		// update state with auth data
    //this.setupData();
  },

  setupData() {
		// create auth object
		// let auth = {
		//   member: this.get('auth.member.id'),
		//   position: this.get('auth.member.positionId'),
		//   organization: this.get('auth.organization.id')
		// };


    //modelData.__auth__ = auth;

  },

	// setupAuth: observer('auth.member.id', function() {
	//   // create auth object
	//   let auth = {
	//     member: this.get('auth.member.id'),
	//     position: this.get('auth.member.positionId'),
	//     organization: this.get('auth.organization.id')
	//   };

	//   const store = createStoreMethods(this);

	//   // save auth to state object
	//   this.__state__ = assign({}, this.__state__, { auth, store });
	// }),

	// immutableModel: observer('model', function() {
	//   // get model data
	//   const model = this.get('model');

	//   // store state for immutable updates
	//   this.__state__ = reactDataParser(model, this.__state__);

  //   //StateManager.update({ model: this.__state__ });
	// }),

	// didInsertElement() {
	//   this._super(...arguments);
	//   this.immutableModel();
	// }
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
    const component = lookupReact(this, `component:${name}`);
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


/**
 * Initial react context state
 *
 * @private
 * @property initialState
 * @type {object}
 */
// const initialState = { model: {} };

/**
 * provider and consumer context for state management
 *
 * @private
 * @property ModelContext
 * @type {React.Context}
 */
// const ModelContext = React.createContext(initialState);

/**
 * state manager allows for ember component
 * to inject state into the react component
 *
 * @private
 * @property stateManager
 * @type {object}
 */
// const StateManager = {
	/**
	 * points to the ReactMount class instance
	 *
	 * @private
	 * @property reactClass
	 * @type {React.Component}
	 */
//   reactClass: null,

	/**
	 * updates the state with a new model state
	 *
	 * @public
	 * @method update
	 * @param model {object} new model state
	 * @return {undefined}
	 */
//   update(model) {
//     this.reactClass.setState(state => {
//       return Object.assign({}, state, model);
//     });
//   }
// };

/**
 * renders the dynamic react class into the
 * ReactMount class
 *
 * @method renderComponent
 * @param ComponentClass {React.Component} react component to render
 * @param state {object} initial class state
 * @return {ReactDom.element}
 */
// const renderComponent = (ComponentClass, state) => {
//   return React.createElement(ComponentClass, { state }, null);
// };

/**
 * Mounts a new react component into an ember components this.element
 *
 * @class ReactMount
 * @extends React.Component
 */
// class ReactMount extends React.Component {
//   constructor(props) {
//     super(props);
//     StateManager.reactClass = this;
//     this.state = initialState;
//   }

//   render() {
//     let { reactClass } = this.props;

//     let provider = React.createElement(Provider);
//     // create a react consumer element
//     //let consumer = React.createElement(ModelContext.Consumer, null, ({ model }) => renderComponent(reactClass, model));

//     // create a reaact provider element
//     //let provider = React.createElement(ModelContext.Provider, { value: this.state }, consumer);

//     // create a container mount elelemt
//     return React.createElement('div',  { className: "react-mount" }, provider);
//   }
// }

// ReactMount.propTypes = {
//   reactClass: PropTypes.func
// };

// function getModelType(model, defaultValue=null) {
//   let modelType = defaultValue;

//   // get modelName from curType if curType is a {DS.Model} or {DS.Model[]}
//   if (!isNone(model)) {
//     let instanceModel = model;
//     if (Array.isArray(instanceModel) && instanceModel.length > 0) {
//       instanceModel = instanceModel.get ? instanceModel.get('firstObject') : instanceModel[0];
//     }

//     if (instanceModel instanceof DS.Model) {
//       modelType = instanceModel._internalModel.modelName;
//     }
//   }
//   return modelType
// }

// function createStoreMethods(target) {

//   function updateModel(type, model) {
//     // trigger will change
//     target.propertyWillChange('model');

//     // set model prop
//     target.set(`model.${type}`, model);

//     // trigger did change
//     target.propertyDidChange('model');
//   }

//   return {
		/**
		 * createRecord helper method for react
		 *
		 * @public
		 * @method createRecord
		 */
//     createRecord(type, props) {
//       let state = target.get('model');
//       let curType = get(state, type);

//       // get model type from model or use default value type
//       let modelType = getModelType(curType, type);

//       // create new model record
//       let model = target.get('store').createRecord(modelType, props);

//       if (!isNone(curType)) {
//         if (Array.isArray(curType)) {
//           // refresh model array
//           if (curType.indexOf(model) !== -1) {
//             curType.replaceObject(model);
//           } else {
//             curType.pushObject(model);
//           }
//           updateModel(type, curType);
//         } else {
//           updateModel(type, model);
//         }

//         // } else if (curType instanceof DS.Model && curType.id !== model.id) {
//         // TODO: either replace or add new type field as plural version of type
//         // }
//       } else {
//         // create new property for model
//         updateModel(type, model);
//       }

//       // parse data model
//       return reactDataParser(model, {});
//     }
//   }
// }
