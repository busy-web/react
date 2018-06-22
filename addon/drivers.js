/**
 * @module @busy-web/react
 *
 */
import { flatten } from 'lodash';
import Member from './models/member';
import Organization from './models/organization';

export default function drivers() {
  const ds = [
    Member.getDrivers(),
    Organization.getDrivers(),
  ];

  return flatten(ds);
}
