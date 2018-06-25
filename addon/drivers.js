/**
 * @module @busy-web/react
 *
 */
import { flatten } from 'lodash';
import Member from './models/member';
import Organization from './models/organization';
import TimeEntry from './models/time-entry';
import TimeEntryBreak from './models/time-entry-break';

export default function drivers() {
  const ds = [
    Member.getDrivers(),
    Organization.getDrivers(),
    TimeEntry.getDrivers(),
    TimeEntryBreak.getDrivers(),
  ];

  const __drivers = flatten(ds);
  window.console.log('drivers', __drivers);
  return __drivers;
}
