import React from 'react';
import PropTypes from 'prop-types';
import { ApiCard } from '../../defaultStyle';

/**
 * @function
 * Card providing link to rest api endpoint of sheet
 * @param {string} - props.host - host origin
 * @param {string} - props.id - sheet ID
 * @returns {jsx} <RestExample />
 */
const RestExample = ({ host, id }) => (
	<ApiCard>
		<span className="pill">REST API:</span>
		<a href={`${host}/api/sheet/${id}`} target="_blank">
			{host}/api/sheet/{id}
		</a>
	</ApiCard>
);

RestExample.propTypes = {
	host: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export { RestExample };
