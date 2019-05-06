import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const HeadlessTable = ({ data }) => {
	let columnDefs = [];
	const rowData = [...data];
	const defaultColDef = {
		resizable: true,
		sortable: true,
		columnDrag: true,
		filter: true,
		width: 225,
	};
	Object.keys(data[0]).forEach(key => {
		columnDefs.push({
			headerName: key,
			field: key,
		});
	});

	return (
		<Styledtable className="ag-theme-material">
			<AgGridReact
				columnDefs={columnDefs}
				rowData={rowData}
				defaultColDef={defaultColDef}
			/>
		</Styledtable>
	);
};

HeadlessTable.propTypes = {
	data: PropTypes.array.isRequired,
};

/* istanbul ignore next */
const Styledtable = styled.div`
	height: 90%;
	min-height: 200px;
	border: 1px solid ${props => props.theme.color.border};
	font-family: ${props => props.theme.font.main};
	font-size: 14px;
	letter-spacing: 1px;
	border-radius: 2px;
	overflow: hidden;
	background-color: white;
	width: 80%;
	max-width: ${props => props.children.props.columnDefs.length * 225 + 'px'};
	margin: auto;
	margin-top: 20px;

	.ag-header-cell-text {
		font-family: ${props => props.theme.font.main};
		font-size: 14px;
	}

	.ag-row-even {
		background-color: ${props => props.theme.color.background};
	}
	.ag-row-hover {
		background-color: ${props => props.theme.color.lightBlue};
	}

	.ag-header {
		background-color: ${props => props.theme.color.text};
		color: white;

		& .ag-column-hover {
			background-color: ${props => props.theme.color.background};
			color: ${props => props.theme.color.text};
			border-bottom: 5px solid ${props => props.theme.color.blue};
		}
	}

	.ag-icon-desc,
	.ag-icon-asc {
		background-color: ${props => props.theme.color.blue};
		border-radius: 10px;
		position: relative;
		top: 5px;
		padding: 2px;
	}
	.ag-icon-filter {
		background-color: ${props => props.theme.color.blue};
		border-radius: 4px;
		position: relative;
		top: 5px;
		padding: 5px;
	}
`;

export default HeadlessTable;
