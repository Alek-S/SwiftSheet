import styled from 'styled-components';

const StyledTable = styled.div`
	.ReactVirtualized__Table__headerRow {
		font-weight: 700;
		text-transform: uppercase;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.ReactVirtualized__Table__row {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.ReactVirtualized__Table__headerTruncatedText {
		display: inline-block;
		max-width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.ReactVirtualized__Table__headerColumn,
	.ReactVirtualized__Table__rowColumn {
		margin-right: 10px;
		min-width: 0px;
	}
	.ReactVirtualized__Table__rowColumn {
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ReactVirtualized__Table__headerColumn:first-of-type,
	.ReactVirtualized__Table__rowColumn:first-of-type {
		margin-left: 10px;
	}
	.ReactVirtualized__Table__sortableHeaderColumn {
		cursor: pointer;
	}

	.ReactVirtualized__Table__sortableHeaderIconContainer {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.ReactVirtualized__Table__sortableHeaderIcon {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 24px;
		flex: 0 0 24px;
		height: 1em;
		width: 1em;
		fill: currentColor;
	}
`;

export default StyledTable;
