import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Column, Table, AutoSizer } from 'react-virtualized';
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

		return columnsArr.map(column => (
			<Column
				width={200}
				label={column}
				dataKey={column}
				style={
					{
						// backgroundColor: 'white',
					}
				}
				width={850}
			/>
		));
	};

	return (
		<Styledtable>
			<AutoSizer disableHeight>
				{({ width }) => (
					<Table
						width={width}
						height={300}
						headerHeight={40}
						rowHeight={50}
						rowCount={data.length}
						rowGetter={({ index }) => data[index]}
					>
						{getColumn()}
					</Table>
				)}
			</AutoSizer>
		</Styledtable>
	);
};

SwiftTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Styledtable = styled(DefaultStyle)`
	margin: 3rem;
	border: 1px solid ${props => props.theme.color.border};
	border-radius: 7px;
	overflow: hidden;
	background-color: white;

	.ReactVirtualized__Table__rowColumn {
		height: 25px;
	}

	.ReactVirtualized__Table__headerRow {
		background-color: ${props => props.theme.color.blue};
		/* border-radius: 7px; */
	}
`;

export default SwiftTable;
