import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { SubmitButton } from '../../defaultStyle';

const Table = ({ data }) => {
	let columnDefs = [];
	const rowData = [...data];
	const defaultColDef = {
		resizable: true,
		sortable: true,
		columnDrag: true,
		filter: true,
		width: 225,
	};
	let api;
	Object.keys(data[0]).forEach(key => {
		columnDefs.push({
			headerName: key,
			field: key,
		});
	});

	const onExport = () => {
		api.exportDataAsCsv();
	};

	const onGridReady = params => {
		api = params.api;
	};

	return (
		<React.Fragment>
			<ButtonGroup style={{ maxWidth: `${columnDefs.length * 225 + 'px'}` }}>
				<ExportButton onClick={onExport}>Export CSV</ExportButton>
			</ButtonGroup>
			<Styledtable className="ag-theme-material">
				<AgGridReact
					columnDefs={columnDefs}
					rowData={rowData}
					defaultColDef={defaultColDef}
					onGridReady={onGridReady}
				/>
			</Styledtable>
		</React.Fragment>
	);
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
};

/* istanbul ignore next */
const Styledtable = styled.div`
	height: 98%;
	font-family: ${props => props.theme.font.main};
	font-size: 14px;
	letter-spacing: 1px;


	background-color: white;
	width: 80%;
	max-width: ${props => props.children.props.columnDefs.length * 225 + 'px'};
	margin: auto;
	margin-top: 0px;
	border: none;
	box-shadow: ${props => props.theme.boxShadowLight};

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
		background: ${props => props.theme.gradient.light};
		color: ${props => props.theme.color.text};

		& .ag-header-cell {
			border-right: 1px solid ${props => props.theme.color.backgroundDark};
		}

		& .ag-column-hover {
			background: ${props => props.theme.gradient.light};
			color: ${props => props.theme.color.text};
			border-bottom: 4px solid ${props => props.theme.color.red};
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
		/* background-color: ${props => props.theme.color.blue}; */
		border-radius: 4px;
		position: relative;
		top: 5px;
	}

	.ag-filter{
		background: ${props => props.theme.gradient.light};
		box-shadow: ${props => props.theme.boxShadowLight};
		font-family: ${props => props.theme.font.main};
	}

	.ag-theme-material .ag-filter input[type="text"], .ag-theme-material .ag-filter input[type="date"] {
			border-bottom: 1px solid ${props => props.theme.color.border};
	}
`;

const ButtonGroup = styled.div`
	width: 80%;
	margin: auto;
	display: flex;
	flex-direction: row-reverse;
	margin-top: 2rem;
	margin-bottom: 0rem;
	padding-bottom: 0rem;
`;

const ExportButton = styled(SubmitButton)`
	border-radius: 10px 10px 0 0;
	font-size: 0.85rem;
	width: 120px !important;
`;

export default Table;
export { Styledtable };
