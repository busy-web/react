/**
 * @module Utils
 *
 */
import { isEmpty } from 'lodash';
import TectonicSuperagent from 'tectonic-superagent'; // superagent driver
import QueryString from './query-string';

/**
 *
 */
export default class BusySuperagent extends TectonicSuperagent {
  parseUrlParams({ url, query }) {
    //let _url = super.parseUrlParams({ url, query });

    // copy query params
    let params = Object.assign({}, query.params);

    // remove all used query params
    let usedParams = url.match(/:([a-zA-Z](\w+)?)/g) || [];
    usedParams.forEach(p => {
      let key = p.slice(1);
      url = url.replace(p, params[key]);
      delete params[key];
    });

    if (!isEmpty(params)) {
      url += '&' + QueryString.stringify(params);

      // make sure arguments start with a question mark symbol
      if (!/\?/.test(url)) {
        url = url.replace(/&/, '?');
      }

      // make sure the first param is not ?&
      url = url.replace(/\?&/, '?');
    }

    console.log('query', url, query);

    return url;
  }
}
