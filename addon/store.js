import {
  //applyMiddleware,
  createStore,
  combineReducers,
} from 'redux';
import { reducer as tectonicReducer } from 'tectonic';

// tectonic *must* be added under the "tectonic" namespace
const reducers = combineReducers({
  tectonic: tectonicReducer,
});

// create a store with your optional middleware
const store = createStore(reducers);

export default store;
