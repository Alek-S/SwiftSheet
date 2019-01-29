import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
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
		// do stuff with files...
		console.log(file);
		console.log(file[0].preview);
		this.setState({ file, rejectedFile });
	};

	onDragEnter = () => this.setState({ dragging: true });

	onDragLeave = () => this.setState({ dragging: false });

	render() {
		const { dragging } = this.state;

		return (
			<section style={{ height: 'calc(100vh - 200px)' }}>
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
		props.dragging ? props.theme.color.blue : props.theme.color.background};
	border: dashed 1px
		${props =>
			props.dragging ? props.theme.color.blue : props.theme.color.border};
	border-radius: 4px;
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
