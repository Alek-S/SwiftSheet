import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultStyle, { ErrorDialog, SuccessDialog } from '../../defaultStyle';
import Filedrop from '../../components/Filedrop/Filedrop';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Papa from 'papaparse';
import { deflate } from 'pako';
import ReactGA from 'react-ga';

const UPLOAD_SHEET = gql`
	mutation UPLOAD_SHEET(
		$sheetData: String!
		$expireIn: Int!
		$password: String
	) {
		createSheet(
			sheetData: $sheetData
			expireIn: $expireIn
			password: $password
		) {
			_id
		}
	}
`;

/**
 * @function
 * Page to upload file and set upload settings
 * @returns {JSX} <UploadPage />
 */
const UploadPage = () => {
	const [expireIn, setExpireIn] = useState(72);
	const [header, setHeader] = useState(true);
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [redirect, setRedirect] = useState(false);
	const [file, setFile] = useState();
	const [password, setPassword] = useState('');
	const [wrongPassword, setWrongPassword] = useState(false);
	const [uploadErrorMessage, setErrorMessage] = useState('');
	const [UploadSuccessMessage, setSuccessMessage] = useState('');
	const [onDropErrorMessage, setonDropErrorMessage] = useState('');

	ReactGA.pageview('/upload');

	useEffect(() => {
		document.title = `SwiftSheet - Upload`;
	});

	const onCompleted = () => {
		setRedirect(true);
	};

	const renderRedirect = data => {
		const id = data && data.createSheet._id;
		if (redirect) {
			return <Redirect to={`/${id}`} />;
		}
	};

	const onDrop = (file, rejectedFile) => {
		if (
			file[0] &&
			file[0].name &&
			file[0].name.indexOf('.csv') + 4 === file[0].name.length
		) {
			setSuccessMessage(file[0].name);
			setonDropErrorMessage(undefined);
			setFile(file);
			setDisableSubmit(false);
		} else {
			console.error(
				`file rejected!: \n ${rejectedFile[0].name}\n ${rejectedFile[0].type}`
			);
		}
	};

	const checkPassword = pw => {
		const passing = (pw.length !== 0 && pw.length < 6) || pw.length > 70;
		setPassword(pw);
		setWrongPassword(passing);
	};

	const showErrorMessage = () => {
		setErrorMessage('⚠️ Woops! Something went wrong');
	};

	/** cleans up header for safer handling, specifically period for header (since used for key) */
	const cleanData = data => {
		let cleanedData = data;
		if (header) {
			cleanedData.map(rowObj => {
				for (const key in rowObj) {
					if (key.includes('.')) {
						const newKey = key.replace('.', '_');
						rowObj[newKey] = rowObj[key];
						delete rowObj[key];
						return rowObj[newKey];
					}
				}
			});
		}
		return cleanedData;
	};

	return (
		<StyledDiv>
			<Filedrop
				firstRowHeader={header}
				expireIn={expireIn}
				setHeader={setHeader}
				password={password}
				setPassword={checkPassword}
				setExpireIn={setExpireIn}
				onDrop={onDrop}
				wrongPassword={wrongPassword}
				setDisableSubmit={setDisableSubmit}
				setonDropErrorMessage={setonDropErrorMessage}
				onDropErrorMessage={onDropErrorMessage}
				setSuccessMessage={setSuccessMessage}
				setErrorMessage={setErrorMessage}
			/>
			<StyledForm disableSubmit={disableSubmit}>
				<Mutation mutation={UPLOAD_SHEET} onCompleted={onCompleted}>
					{(uploadSheet, { loading, error, data }) => {
						if (error) {
							showErrorMessage();
						}

						return (
							<div>
								{renderRedirect(data)}
								<input
									type="submit"
									aria-label="upload button"
									onClick={e => {
										e.preventDefault();

										ReactGA.event({
											category: 'User',
											action: 'Click Upload',
										});

										Papa.parse(file[0], {
											header: header,
											download: true,
											skipEmptyLines: false,
											complete: ({ data }) =>
												uploadSheet({
													variables: {
														sheetData: btoa(
															deflate(JSON.stringify(cleanData(data)), {
																to: 'string',
															})
														), // zlib compress + zlib
														expireIn: parseInt(expireIn),
														password: password,
													},
												}),
										});
									}}
									value={loading ? 'Uploading...' : 'Upload File'}
									disabled={disableSubmit || loading}
								/>
							</div>
						);
					}}
				</Mutation>
				<UploadError className={uploadErrorMessage ? 'true' : undefined}>
					{uploadErrorMessage}
				</UploadError>
				<UploadSuccess className={UploadSuccessMessage ? 'true' : undefined}>
					File to upload: <strong>{UploadSuccessMessage}</strong>
				</UploadSuccess>
			</StyledForm>
		</StyledDiv>
	);
};

const StyledDiv = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	padding-top: 7rem;
	height: calc(100vh - 100px);
	min-height: 820px;
`;

const StyledForm = styled.form`
	display: block;
	width: 60%;
	margin: auto;
	text-align: center;
	margin-top: 2rem;

	label {
		font-size: 1.1rem;
	}
	select {
		font-family: ${props => props.theme.font.main};
		font-size: 1rem;
		background-color: white;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		border: solid 1px ${props => props.theme.color.border};
	}

	input[type='submit'] {
		box-sizing: border-box;
		position: relative;
		cursor: ${props => (props.disableSubmit ? 'no-drop' : 'pointer')};
		color: ${props =>
			props.disableSubmit ? props.theme.color.border : 'white'};
		display: block;
		margin: auto;
		font-family: ${props => props.theme.font.main};
		font-weight: 400;
		font-size: 1.3rem;
		border: ${props =>
			props.disableSubmit ? `2px solid ${props.theme.color.border}` : 'none'};
		border-radius: 30px;
		padding: 10px 30px;
		background: ${props =>
			props.disableSubmit ? 'transparent' : props.theme.gradient.greenBlue};
		box-shadow: ${props => (props.disableSubmit ? '' : props.theme.boxShadow)};
		transition: all 0.5s;

		&:hover {
			background: ${props =>
				props.disableSubmit ? 'transparent' : props.theme.gradient.greenBlue};
			box-shadow: ${props =>
				props.disableSubmit ? '' : props.theme.boxShadowDark};
		}
	}
`;

const UploadError = styled(ErrorDialog)`
	min-width: 200px;
	width: fit-content;
	margin: auto;
	margin-top: 2rem;
`;

const UploadSuccess = styled(SuccessDialog)`
	min-width: 200px;
	width: fit-content;
	margin: auto;
	margin-top: 0.15rem;
`;

export default UploadPage;
