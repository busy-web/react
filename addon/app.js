/**
 * @module @busy-web/react
 *
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Loader } from 'tectonic';
import store from './store';
import manager from './manager';

const createApp = (Component, data) => {
  return (
    <Provider store={store}>
      <Loader manager={manager}>
        <Component {...data} />
      </Loader>
    </Provider>
  );
};

export default createApp;
