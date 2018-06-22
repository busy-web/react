/**
 * @module Utils
 *
 */
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
  let driver = {};

  // set returns handle or model for delete
  if (type === ALLOWED_TYPES.FILTER) {
    driver.returns = model.list();
  } else if (type === ALLOWED_TYPES.DELETE) {
    driver.model = model;
  } else {
    driver.returns = model.item();
  }

  // get url for model api type
  let { url, version } = getUrlForType(model.apiType);

  // add model name to call
  url += `/${model.modelName}`;

  if (type === ALLOWED_TYPES.FIND) {
    url += `/:${model.__primaryKey}`;
    driver.params = [ model.__primaryKey ];
  } else if (type === ALLOWED_TYPES.FILTER) {
    driver.params = []
      .concat(model.__foreignKeys)
      .concat(model.__filters);
  }

  // add version to url;
  url += `?${version}`;

  // add method type to meta
  const method = METHOD_TYPES[type];

  // add url to meta object
  driver.meta = Object.assign({ url, method }, model.meta);

  // add query type
  driver.queryType = QUERY_TYPES[type];

  return driver;
}

export default function createDrivers(model) {
  if (!Array.isArray(model.methodsAllowed)) {
    throw new Error(`methodsAllowed must be an array in ${model.modelName}`);
  }

  return model.methodsAllowed.map(type => buildDriver(model, type));
}
