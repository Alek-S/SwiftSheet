import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import defaultStyle, { Card, ErrorDialog } from '../../defaultStyle';

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
	setDisableSubmit,
	setErrorMessage,
	setonDropErrorMessage,
	onDropErrorMessage,
	onDrop,
	wrongPassword,
	setSuccessMessage,
}) => {
	const [dragging, setDragging] = useState(false);
	const MAX_SIZE = 2500000;
	const FILE_FORMAT = '.csv';

	/**
	 * @function
	 * Set expireIn state, in Hrs
	 * @param {object} e - dom event
	 */
	const _handleChange = e => {
		e.preventDefault();
		setExpireIn(parseInt(e.target.value));
	};

	/**
	 * @function
	 * Toggle first row of CSV header boolean
	 * @param {object} e - dom event
	 */
	const _toggleHeader = e => {
		e.preventDefault();
		setHeader(!firstRowHeader);
		setErrorMessage(undefined);
	};

	const _handleRejection = e => {
		const { size, type } = e[0];

		if (size >= MAX_SIZE) {
			setSuccessMessage(undefined);
			setonDropErrorMessage(
				'⚠️ Woops! Bit too large. Upload limit is currently 2.5MB.'
			);
			setDisableSubmit(true);
		} else if (type !== FILE_FORMAT) {
			setSuccessMessage(undefined);
			setonDropErrorMessage(
				'⚠️ Woops! Only CSV file types currently supported'
			);
			setDisableSubmit(true);
		} else {
			setSuccessMessage(undefined);
			setonDropErrorMessage(
				'⚠️ Woops! Something went wrong. Check that file is formatted correctly'
			);
			setDisableSubmit(true);
		}
		console.warn('upload rejected', e);
	};

	return (
		<StyledSection>
			<Dropzone
				onDrop={onDrop}
				accept={FILE_FORMAT}
				maxSize={MAX_SIZE}
				minSize={8}
				multiple={false}
				dragging={dragging ? 'true' : undefined}
				onDragEnter={() => setDragging(true)}
				onDragLeave={() => setDragging(false)}
				onDropRejected={_handleRejection}
			>
				{({ getRootProps, getInputProps }) => (
					<StyledDropzone dragging={dragging}>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
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
							<StyledText>
								{dragging ? 'Drop' : 'Drag'} CSV file here
							</StyledText>
						</div>
					</StyledDropzone>
				)}
			</Dropzone>
			<UploadError className={onDropErrorMessage ? 'true' : undefined}>
				{onDropErrorMessage}
			</UploadError>
			<Options role="form" aria-label="preferences">
				<section aria-label="set password">
					Password:
					<input
						value={password}
						className={wrongPassword ? wrongPassword.toString() : undefined}
						onChange={e => setPassword(e.target.value)}
						type="password"
						placeholder="enter password"
						autoComplete="new-password"
					/>
				</section>

				<section aria-label="set expiration">
					Expires In:
					<select
						value={expireIn}
						onChange={_handleChange}
						aria-label="expire-in-select"
					>
						<option value={1}>1 Hour</option>
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
						<button onClick={_toggleHeader} aria-label="toggle-header-button">
							{firstRowHeader ? 'Yes' : 'No'}
						</button>
					</HeaderToggle>
				</section>
			</Options>

			<UploadError
				className={wrongPassword ? wrongPassword.toString() : undefined}
			>
				⚠️ Check Password Length
			</UploadError>
		</StyledSection>
	);
};

const StyledSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledDropzone = styled.div`
	background-color: ${props =>
		props.dragging ? props.theme.color.blue : '#fff'};
	border: dashed 2px
		${props =>
			props.dragging ? props.theme.color.darkBlue : props.theme.color.border};
	border-radius: 5px;
	height: 250px;
	width: 70%;
	margin: auto;
	margin-top: 3rem;

	img {
		display: block;
		height: 200px;
		width: 80%;
		margin: auto;
	}

	@media (max-width: 500px) {
		width: 90%;
	}
`;

const StyledText = styled(defaultStyle)`
	color: ${props =>
		props.dragging ? props.theme.color.darkBlue : props.theme.color.lightText};
	font-size: 1.2rem;
	text-align: center;
	background-color: transparent;
`;

const Options = styled(Card)`
	padding-top: 1.75rem;
	padding-bottom: 1.75rem;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	width: 70%;
	margin: auto;
	text-align: center;
	margin-top: 3.5rem;

	input {
		margin: 0 2rem 0 0.25rem;
		padding-left: 1rem;
		width: 140px;
		font-size: 0.9rem;
		font-weight: 400;
		height: 25px;

		::placeholder {
			color: ${props => props.theme.color.backgroundDarkest};
		}
	}

	select {
		margin-left: 0.25rem;
	}

	@media (max-width: 500px) {
		width: 90%;
		flex-direction: column;
		input,
		select,
		section {
			margin: 0.5rem 0;
		}
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
	onDropErrorMessage: PropTypes.string,
	setonDropErrorMessage: PropTypes.func,
	setDisableSubmit: PropTypes.func,
	setSuccessMessage: PropTypes.func,
	setErrorMessage: PropTypes.func,
};

const UploadError = styled(ErrorDialog)`
	min-width: 200px;
	width: fit-content;
	margin-top: 2rem;
`;

export default Filedrop;
