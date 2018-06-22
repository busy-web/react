/**
 * @module Utils
 *
 */

const SUPPORTED = ['string', 'number', 'int', 'float', 'boolean'];

export default function attr(type, opts={}) {
  if (!type) {
    throw new Error(`Type is a required param for attr()`);
  }

  if (SUPPORTED.indexOf(type) === -1) {
    throw new Error(`Type is not supported in attr(), supported types are [ ${SUPPORTED.join(', ')} ]`);
  }

  if (!opts || typeof opts !== 'object' || opts.constructor !== Object) {
    throw new Error(`opts must be an object as the second param to attr()`);
  }

  let meta = {
    type,
    defaultValue: (opts.defaultValue || defaultTypeValue(type))
  };

  return {
    meta,

    defaultValue() {
      return meta.defaultValue;
    },

    get(model, key, value) {
      return validateType(model, type, key, value);
    }
  };
}

function defaultTypeValue(type) {
  if (type === 'string') {
    return '';
  } else if (type === 'int') {
    return 0;
  } else if (type === 'float') {
    return 0;
  } else if (type === 'boolean') {
    return false;
  }
}

function castValue(type, value) {
  if (type === 'string') {
    return value.toString ? value.toString() : `${value}`;
  } else if (type === 'int' || type === 'number') {
    return parseInt(value, 10);
  } else if (type === 'float') {
    return parseFloat(value);
  } else if (type === 'boolean') {
    return !!(value);
  }
}

function validateType(model, type, key, value) {
  if (value === null || value === undefined) {
    return value;
  }

  const assertValidType = (test) => {
    if (!test) {
      throw new Error(`Type Error: ${value} is not type [${type}] for model property <${model.className}:${key}>`);
    }
  };

  let _value = castValue(type, value);
  console.log(`${_value}`, `${value}`);

  assertValidType(!isNaN(_value));
  assertValidType(`${_value}` === `${value}`);

  switch (type) {
    case 'string':
      assertValidType(typeof value === 'string');
    case 'number':
    case 'int':
    case 'float':
      assertValidType(typeof value === 'number');
    case 'boolean':
      assertValidType(typeof value === 'boolean');
  }

  return value;
}
