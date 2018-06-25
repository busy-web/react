/**
 * @module @busy-web/react
 *
 */
import { Manager, BaseResolver } from 'tectonic';
import BusySuperagent from './utils/busy-superagent';
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
    fromSuperagent: new BusySuperagent({
      request: (r) => {
        r.set('Content-Type', 'application/json');
        let auth = window.localStorage.getItem('auth-member');
        if (auth && auth.length) {
          auth = JSON.parse(auth);
          r.set('Key-Authorization', auth.token);
        }
        return r;
      }
    }),
  },

  // give the manager access to your redux store so we can save data within
  // the tectonic reducer
  store: store,
});

manager.drivers.fromSuperagent(drivers());

export default manager;
