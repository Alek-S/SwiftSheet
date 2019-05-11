import React from 'react';
import PropTypes from 'prop-types';
import { ApiCard } from '../../defaultStyle';

/**
 * @function
 * Card providing link to GraphQL api endpoint & body of sheet
 * @param {string} - props.host - host origin
 * @param {string} - props.id - sheet ID
 * @returns {jsx} <RestExample />
 */
const GQLExample = ({ host, id }) => (
	<ApiCard>
		<p>
			<span className="pill">GraphQL API:</span>
			<a href={`${host}/graphql`} target="_blank">
				{host}/graphql
			</a>
		</p>
		<p className="query_title">
			{' '}
			<span className="pill-secondary">Body:</span>
			<span className="gql_query">
				{'{'}
				sheet( _id: "{id}" ){'{'}
				sheetData
				{'}'}
				{'}'}
			</span>
		</p>
	</ApiCard>
);

GQLExample.propTypes = {
	host: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export { GQLExample };
