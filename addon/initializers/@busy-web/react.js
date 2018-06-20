/**
 * @module Initializers
 *
 */
import { get } from '@ember/object';

export function initialize(application) {
  // node process variable used by react
  const process = {};
  process.env = get(application, 'busy-web.react');

  // attach process to window for global access
  window.process = process;
}

export default {
  initialize
};
