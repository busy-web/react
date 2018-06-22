/**
 * @module Utils
 *
 */

/**
 * Type Constants
 *
 */
export const FIND = "FIND";
export const FILTER = "FILTER";
export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

/**
 * Allowable types
 *
 */
export const ALLOWED_TYPES = {
  FIND: "FIND",
  FILTER: "FILTER",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE"
}

export const API_TYPES = {
  REST: 'rest',
  RPC: 'rpc',
  P1_REPORTS: 'etl',
  P2_REPORTS: 'etl_plat',
  QUICKBOOKS: 'qb'
};

export const QUERY_TYPES = {
  FIND: "GET",
  FILTER: "GET",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE"
};

export const METHOD_TYPES = {
  FIND: "GET",
  FILTER: "GET",
  CREATE: "POST",
  UPDATE: "PATCH",
  DELETE: "DELETE"
};

