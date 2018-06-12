/**
 * @module Utils
 *
 */
import DS from 'ember-data';
import { isEmpty, isNone } from '@ember/utils';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';


/**
 * Parse ember model data into immutable type objects for React
 *
 * @public
 * @method reactDataParser
 * @param din {object|object[]} data in - the data to parse
 * @param state {object} the current react data state
 * @return {object} the new react data state
 */
export default function reactDataParser(din, state) {
	// return default model object
	if (isNone(din) || typeof din !== 'object') {
		return state;
	}

	let data = parseData(din);
	return assign({}, state, data);
}

/**
 * Dispatch data in to the appropriate type parser
 *
 * Values that are not an object or array type will be returned without
 * changing the value
 *
 * @private
 * @method parseData
 * @param din {object|object[]|mixed} data in object
 * @return {object}
 */
function parseData(din) {
	// return default empty object
	// if data in is null or undefined
	if (isNone(din)) {
		return null;
	}

	// parse ember models and model arrays and
	// parse native objects and arrays.
	if (din instanceof DS.Model) {																		// DS.Model instance
		return convertModel(din);
	} else if (din instanceof Array) {																// array
		return convertArray(din);
	} else if (din instanceof Object) {																// object
		return convertObject(din);
	}

	// return default as empty object
	return din;
}

/**
 * Check each property on an object and parse any DS.Model or Array types
 *
 * @private
 * @method convertObject
 * @param din {object} data in object
 * @return {object}
 */
function convertObject(din) {
	assert("convertObject requires an object as the first param", !isNone(din) && typeof din === 'object');

	const dout = {};
	Object.keys(din).forEach(key => {
		let data = parseData(din[key]);
		dout[key] = data;
	});

	return normalizeData(dout);
}

/**
 * Loop over an array and parse each value
 *
 * @private
 * @method convertArray
 * @param din {DS.Model[]}
 * @return {object[]}
 */
function convertArray(din) {
	assert("convertArray requires an array as the first param", !isNone(din) && Array.isArray(din));

	let dout = [];
	din.map(item => {
		let data = parseData(item);
		dout.push(data);
	});

	return normalizeData(dout);
}

/**
 * Converts a DS.Model to a native object
 *
 * @private
 * @method convertMode
 * @param din {DS.Model}
 * @return {object}
 */
function convertModel(din) {
	assert("convertModel requires a DS.Model as the first param", !isNone(din) && din instanceof DS.Model);

	// get model properties
	const dout = din.toJSON();
	dout.id = din.id;
	dout.save = () => {
		let props = Object.assign({}, this);
		delete props.save;
		delete props.id;

		return din.setProperties(props)
			.save().then(model => convertModel(model));
	};

	return normalizeData(dout);
}

/**
 * Converts all empty objects and arrays to null
 *
 * @private
 * @method normalizeData
 * @param data {mixed} the return data to normalize
 * @return {mixed}
 */
function normalizeData(data) {
	if (isEmpty(data) || (typeof data === 'object' && Object.keys(data).length === 0)) {
		return null;
	}
	return data;
}


