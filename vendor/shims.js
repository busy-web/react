/* !globals define, React, ReactDOM, PropTypes, Redux, ReactRedux */

import React from 'npm:react';
import ReactDOM from 'npm:react-dom';
import PropTypes from 'npm:prop-types';

(function() {
  define('react', [], function() {
    'use strict';
    return { default: React };
  });

  define('react-dom', [], function() {
    'use strict';
    return { default: ReactDOM };
  });

  define('prop-types', [], function() {
    'use strict';
    return { default: PropTypes };
  });

  // define('redux', [], function() {
  //   'use strict';
  //   return {
  //     applyMiddleware: Redux.applyMiddleware,
  //     bindActionCreators: Redux.bindActionCreators,
  //     combineReducers: Redux.combineReducers,
  //     compose: Redux.compose,
  //     createStore: Redux.createStore
  //   };
  // });

  // define('react-redux', [], function() {
  //   'use strict';
  //   return { default: ReactRedux };
  // });
})();
