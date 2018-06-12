/**
 * @module Components
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * React Component method
 *
 * @public
 * @method <%= classifiedModuleName %>
 * @param props.children {React.Element} react jsx element
 * @return {React.Element}
 */
const <%= classifiedModuleName %> = ({ children }) => {
	return (
		<div className="rc-<%= dasherizedModuleName %>">
			{children}
		</div>
	);
};

<%= classifiedModuleName %>.propTypes = {
	children: PropTypes.element
};

export default <%= classifiedModuleName %>;
