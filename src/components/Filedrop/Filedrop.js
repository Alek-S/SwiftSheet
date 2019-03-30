import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import defaultStyle from '../../defaultStyle';

/**
 * @function
 * Area for drag & drop file uploads of csv
 * @param {bool} - props.firstRowHeader - is first row a header
 * @returns {jsx} <Filedrop />
 */
const Filedrop = ({
	firstRowHeader,
	expireIn,
	setExpireIn,
	setHeader,
	password,
	setPassword,
	onDrop,
}) => {
	const [dragging, setDragging] = useState(false);

	/**
	 * @function
	 * Set expireIn state, in Hrs
	 * @param {object} e - dom event
	 */
	const _handleChange = e => {
		e.preventDefault();
		setExpireIn(e.target.value);
	};

	/**
	 * @function
	 * Toggle first row of CSV header boolean
	 * @param {object} e - dom event
	 */
	const _toggleHeader = e => {
		e.preventDefault();
		setHeader(!firstRowHeader);
	};

	return (
		<section>
			<StyledDropzone
				onDrop={onDrop}
				accept="text/csv"
				maxSize={5000000}
				minSize={1}
				multiple={false}
				dragging={dragging ? 'true' : undefined}
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
			<Options role="form" aria-label="preferences">
				<section aria-label="set password">
					Password:
					<input value={password} onChange={e => setPassword(e.target.value)} />
				</section>

				<section aria-label="set expiration">
					Expires In:
					<select value={expireIn} onChange={_handleChange}>
						<option value={4}>4 Hours</option>
						<option value={8}>8 Hours</option>
						<option value={24}>1 Day</option>
						<option value={72}>3 Days</option>
						<option value={120}>5 Days</option>
					</select>
				</section>

				<section aria-label="toggle first row header">
					<HeaderToggle active={firstRowHeader}>
						<span>First Row Header:</span>
						<button onClick={_toggleHeader}>
							{firstRowHeader ? 'Yes' : 'No'}
						</button>
					</HeaderToggle>
				</section>
			</Options>
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

const Options = styled.div`
	background-color: ${props => props.theme.color.backgroundDark};
	border-radius: 3px;
	padding-top: 1rem;
	padding-bottom: 1rem;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	width: 60%;
	margin: auto;
	text-align: center;
	margin-top: 2rem;

	input {
		margin: 0 2rem 0 0.25rem;
		padding-left: 0.75rem;
		outline: none;
		width: 120px;
		font-family: ${props => props.theme.font.main};
		font-size: 0.8rem;
		height: 20px;
		border-radius: 10px;
		border: solid 1px ${props => props.theme.color.border};
		transition: all 0.25s;

		&:hover {
			border: solid 1px ${props => props.theme.color.lightBlue};
		}

		&:focus,
		&:active {
			border: solid 1px ${props => props.theme.color.blue};
		}
	}

	select {
		margin-left: 0.25rem;
	}
`;

const HeaderToggle = styled.label`
	margin-left: 2rem;

	button {
		color: white;
		cursor: pointer;
		outline: none;
		background: ${props =>
			props.active
				? props.theme.gradient.greenBlue
				: props.theme.color.backgroundDarkest};
		box-shadow: ${props => (props.active ? props.theme.boxShadow : '')};
		border: none;
		font-family: ${props => props.theme.font.main};
		font-size: 1rem;
		border-radius: 4px;
		margin-left: 1rem;
		padding-top: 5px;
		padding-bottom: 5px;
		width: 70px;
	}
`;

Filedrop.propTypes = {
	firstRowHeader: PropTypes.bool,
	expireIn: PropTypes.number,
	setExpireIn: PropTypes.func,
	setHeader: PropTypes.func,
	password: PropTypes.string,
	setPassword: PropTypes.func,
	onDrop: PropTypes.func,
};

export default Filedrop;
