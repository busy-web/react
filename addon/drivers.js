/**
 * @module @busy-web/react
 *
 */
import Member from './models/member';

export default function drivers() {
  const ds = [
    Member.getDrivers()
  ];

  return ds.reduce((a, b) => a.concat(b), []);
}
