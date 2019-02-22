import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import styled from 'styled-components';
import DefaultStyle from './StyledTable';

const list = [
	{ name: 'Brian Vaughn', description: 'Software engineer' },
	{ name: 'Alek Shnayder', description: 'FED Dev' },
	// And so on...
];

const HeadlessTable = ({ data }) => {
	console.log('SwiftTable', data);

	const _cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
		return (
			<StyledCell key={key} style={style} columnIndex={columnIndex}>
				{data[rowIndex][columnIndex]}
			</StyledCell>
		);
	};

	return (
		<Styledtable>
			<AutoSizer disableHeight>
				{({ width }) => (
					<Grid
						cellRenderer={_cellRenderer}
						width={width}
						height={300}
						headerHeight={40}
						rowHeight={50}
						rowCount={data.length}
						columnCount={data[0].length}
						columnWidth={175}
					/>
				)}
			</AutoSizer>
		</Styledtable>
	);
};

HeadlessTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const StyledCell = styled.div`
	display: flex;
	align-items: center;
	padding-left: 0.5rem;
	border-bottom: 1px solid ${props => props.theme.color.border};
	border-left: ${props =>
		props.columnIndex !== 0 ? `1px solid ${props.theme.color.border}` : 'none'};
`;

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

export default HeadlessTable;
