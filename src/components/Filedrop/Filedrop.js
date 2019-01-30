import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import defaultStyle from '../../defaultStyle';

/** @class
 * @name Filedrop
 * Area for drag & drop file uploads of csv
 *
 * @returns {JSX}
 */
export default class Filedrop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			rejectedFile: [],
			dragging: false,
		};
	}

	onDrop = (file, rejectedFile) => {
		this.setState({ file, rejectedFile });
		Papa.parse(file[0], {
			header: false,
			download: true,
			skipEmptyLines: false,
			complete: this.handleJSONData,
		});
	};

	handleJSONData = result => {
		const data = result.data;
		console.log(data);
	};

	onDragEnter = () => this.setState({ dragging: true });

	onDragLeave = () => this.setState({ dragging: false });

	render() {
		const { dragging } = this.state;

		return (
			<section style={{ height: 'calc(100vh - 100px)' }}>
				<StyledDropzone
					onDrop={this.onDrop}
					accept="text/csv"
					maxSize={5000000}
					minSize={1}
					multiple={false}
					dragging={dragging}
					onDragEnter={this.onDragEnter}
					onDragLeave={this.onDragLeave}
				>
					<StyledText>{dragging ? 'Drop' : 'Drag'} CSV file here</StyledText>
				</StyledDropzone>
			</section>
		);
	}
}

const StyledDropzone = styled(Dropzone)`
	background-color: ${props =>
		props.dragging ? props.theme.color.blue : '#fff'};
	border: dashed 2px
		${props =>
			props.dragging ? props.theme.color.darkBlue : props.theme.color.border};
	border-radius: 5px;
	height: 250px;
	width: 60%;
	margin: auto;
	margin-top: 4rem;
`;

const StyledText = styled(defaultStyle)`
	font-size: 1.2rem;
	text-align: center;
	background-color: transparent;
	padding-top: 7rem;
`;
