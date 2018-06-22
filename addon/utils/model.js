/**
 * @module Utils
 *
 */
import { Model as BaseModel } from 'tectonic';
import createDrivers from './create-drivers';
import { ALLOWED_TYPES, API_TYPES } from './define-api';


export default class Model extends BaseModel {
  static apiType = API_TYPES.REST;
  static primaryKey = 'id';
  static methodsAllowed = [ ALLOWED_TYPES.FIND, ALLOWED_TYPES.FILTER ];
  static foreignKeys = [];
  static meta = {};
  static properties = {};

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

