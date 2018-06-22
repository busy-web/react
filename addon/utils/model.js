/**
 * @module Utils
 *
 */
import { Model as BaseModel } from 'tectonic';
import createDrivers from './create-drivers';
import { FIND, FILTER, API_TYPES } from './define-api';


export default class Model extends BaseModel {
  static apiType = API_TYPES.REST; // default api type
  static methodsAllowed = [ FIND, FILTER ]; // default methods allowed

  static properties = {};

  static get __primaryKey() {
    const props = this.properties || {};
    const pk = Object.keys(props).find(k => props[k].getMeta('primaryKey') === true);
    if (pk) {
      return pk;
    }
    return 'id';
  }

  static get __foreignKeys() {
    const props = this.properties || {};
    const fks = Object.keys(props).filter(k => props[k].getMeta('foreignKey') === true);
    if (fks && fks.length) {
      return fks;
    }
    return [];
  }

  static get __filters() {
    const props = this.properties || {};
    const filters = Object.keys(props).filter(k => props[k].getMeta('filter') === true);
    if (filters && filters.length) {
      return filters;
    }
    return [];
  }

  static meta = {};

  static get fields() {
    let hasProps = false;
    const props = this.properties || {};
    const propsArray = Object.keys(props).map(key => {
      let attr = props[key];

      let value;
      if (hasProps) {
        value = attr.get(this, key, this.__fields[key]);
      } else {
        value = attr.defaultValue();
      }

      return { [key]: value };
    });

    return propsArray.length
      ? Object.assign(...propsArray)
      : {};
  }

  static get modelName() {
    let name = this.className;
    name = name[0].toLowerCase() + name.slice(1);
    name = name.replace(/([A-Z])/g, letter => `-${letter.toLowerCase()}`);
    return name;
  }

  static get className() {
    let [, name ] = this.toString().split(' ');
    return name;
  }

  static get idField() {
    return this.primaryKey;
  }

  static getDrivers() {
    return createDrivers(this);
  }
}

