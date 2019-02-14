import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import defaultStyle from '../../defaultStyle';

/**
 * @function
 * Area for drag & drop file uploads of csv
 * @returns {jsx} <Filedrop />
 */
const Filedrop = () => {
	const [filedata, setFileData] = useState([]);
	const [dragging, setDragging] = useState(false);

	const onDrop = (file, rejectedFile) => {
		if (
			file[0] &&
			file[0].name &&
			file[0].name.indexOf('.csv') + 4 === file[0].name.length
		) {
			Papa.parse(file[0], {
				header: false,
				download: true,
				skipEmptyLines: false,
				complete: handleJSONData,
			});
		} else {
			// TODO handle Error on UI
			console.error(
				`file rejected!: \n ${rejectedFile[0].name}\n ${rejectedFile[0].type}`
			);
		}
	};

	const handleJSONData = result => {
		console.log(result.data);
		setFileData(result.data);
	};

	return (
		<section>
			<StyledDropzone
				onDrop={onDrop}
				accept="text/csv"
				maxSize={5000000}
				minSize={1}
				multiple={false}
				dragging={dragging}
				onDragEnter={() => setDragging(true)}
				onDragLeave={() => setDragging(false)}
			>
				{dragging ? (
					<img
						src="./assets/images/upload-cloud-darkBlue.svg"
						alt="upload-cloud-logo"
					/>
				) : (
					<img
						src="./assets/images/upload-cloud-light.svg"
						alt="upload-cloud-logo"
					/>
				)}
				<StyledText dragging={dragging}>
					{dragging ? 'Drop' : 'Drag'} CSV file here
				</StyledText>
			</StyledDropzone>
		</section>
	);
};

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

	img {
		display: block;
		height: 200px;
		width: 80%;
		margin: auto;
	}
`;

const StyledText = styled(defaultStyle)`
	color: ${props =>
		props.dragging ? props.theme.color.darkBlue : props.theme.color.lightText};
	font-size: 1.2rem;
	text-align: center;
	background-color: transparent;
`;

export default Filedrop;
