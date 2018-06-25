/**
 * @module Utils
 *
 */
import { camelCase, snakeCase, concat } from 'lodash';
import { ALLOWED_TYPES, API_TYPES, METHOD_TYPES, QUERY_TYPES } from './define-api';

function appSetting(name) {
  name = name.toUpperCase();
  return window.process.app[name];
}

function getUrlForType(apiType) {
  let version = appSetting('api_version');
  let url = appSetting('api_url')

  if (apiType === API_TYPES.P1_REPORTS) {
    url = appSetting('etl_url');
    version = appSetting('etl_version');
  } else if (apiType === API_TYPES.P2_REPORTS) {
    url = appSetting('etl_plat_url');
  } else if (apiType === API_TYPES.QUICKBOOKS) {
    url = appSetting('qb_url');
  }

  version = `_version=${version}`;
  if (appSetting('debug_mode')) {
    version = `${version}&_debug=true`;
  }

  return { url, version };
}

function buildDriver(model, type) {
  let driver = {
    id: `__${model.className}--${type}__`,
    model: model
  };

  // set returns handle or model for delete
  if (type === ALLOWED_TYPES.FILTER) {
    driver.returns = model.list();
  } else if (type !== ALLOWED_TYPES.DELETE) {
    driver.returns = model.item();
  }

  // get url for model api type
  let { url, version } = getUrlForType(model.apiType);

  // add model name to call
  url += `/${model.modelName}`;

  if (type === ALLOWED_TYPES.FIND) {
    url += `/:${snakeCase(model.__primaryKey)}`;
    driver.params = [ snakeCase(model.__primaryKey) ];
  } else if (type === ALLOWED_TYPES.FILTER) {
    driver.optionalParams = (
      concat(
        model.__foreignKeys.map(k => snakeCase(k)),
        model.__filters.map(k => snakeCase(k)),
        model.defaultFilters.map(k => '_' + snakeCase(k))
      )
    );
  }

  // add version to url;
  url += `?${version}`;

  // add method type to meta
  const method = METHOD_TYPES[type];

  // add url to meta object
  driver.meta = Object.assign({
    url,
    method,
    //headers: ? r.set(headers);
    transform(response) {
      return normailzeResponse(type, response);
    }
  }, model.meta);

  // add query type
  driver.queryType = QUERY_TYPES[type];

  return driver;
}

function normailzeResponse(type, response) {
  if (!response.ok) {
    return response;
  }

  let data = response.body;
  if (!data.success) {
    response.error = true;
    response.clientError = true;
    return response;
  }

  const result = data.data.map(din => {
    return Object.assign(...Object.keys(din).map(k => ({ [camelCase(k)]: din[k] })));
  });

  if (type === ALLOWED_TYPES.FILTER) {
    return result;
  } else {
    return result[0];
  }
}

export default function createDrivers(model) {
  if (!Array.isArray(model.methodsAllowed)) {
    throw new Error(`methodsAllowed must be an array in ${model.modelName}`);
  }

  return model.methodsAllowed.map(type => buildDriver(model, type));
}
