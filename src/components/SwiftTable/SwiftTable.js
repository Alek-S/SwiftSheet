import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Column, Table } from 'react-virtualized';
import DefaultStyle from './StyledTable';

const list = [
	{ name: 'Brian Vaughn', description: 'Software engineer' },
	{ name: 'Alek Shnayder', description: 'FED Dev' },
	// And so on...
];

const SwiftTable = ({ data }) => {
	console.log('SwiftTable', data);

	const getColumn = () => {
		const columnsArr = Object.keys(data[0]);

		return columnsArr.map(column => {
			<Column width={200} label={column} dataKey={column} />;
		});
	};

	return (
		<Styledtable>
			<Table
				width={800}
				height={300}
				headerHeight={20}
				rowHeight={50}
				rowCount={data.length}
				rowGetter={({ index }) => data[index]}
			>
				{Object.keys(data[0]).map(column => (
					<Column width={200} label={column} dataKey={column} />
				))}
			</Table>
		</Styledtable>
	);
};

SwiftTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Styledtable = styled(DefaultStyle)`
	width: 80%;
	margin: auto;
	margin-top: 3rem;
	border: 2px solid green;
	background-color: white;

	* .ReactVirtualized__Table__rowColumn {
		height: 25px;
	}
`;

export default SwiftTable;
