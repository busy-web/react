/**
 * @module @busy-web/react
 *
 */
import { Manager, BaseResolver } from 'tectonic';
import TectonicSuperagent from 'tectonic-superagent'; // superagent driver
import drivers from './drivers';
import store from './store';

// create a new manager with all of the options provided
const manager = new Manager({
  // the resolver matches queries against your source definitions (API endpoints)
  // and invokes them.
  resolver: new BaseResolver(),

  // drivers specifies all of the drivers for use when data loading.  each
  // source definition must use one of these drivers.
  drivers: {
    // install the superagent driver with default options. For more options
    // such as global request modifiers (eg. to add headers to every request)
    // see the tectonic-superagent documentation.
    fromSuperagent: new TectonicSuperagent(),
  },

  // give the manager access to your redux store so we can save data within
  // the tectonic reducer
  store: store,
});

const ds = drivers();

console.log('drivers', ds);

manager.drivers.fromSuperagent(ds);

export default manager;
