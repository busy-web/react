/* globals define, React, ReactDOM, PropTypes */

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

  define('react-redux', [], function() {
		'use strict';
		return { default: ReactRedux };
  });
})();
