import React, { useState } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import Filedrop from '../../components/Filedrop/Filedrop';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Papa from 'papaparse';

const UPLOAD_SHEET = gql`
	mutation UPLOAD_SHEET($sheetData: JSON!, $expireIn: Int!, $password: String) {
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

	const onCompleted = data => {
		// const id = data.createSheet._id;
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
			setFile(file);

			setDisableSubmit(false);
		} else {
			// TODO handle Error on UI
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
			/>
			<StyledForm disableSubmit={disableSubmit}>
				<Mutation mutation={UPLOAD_SHEET} onCompleted={onCompleted}>
					{(uploadSheet, { loading, error, data }) => (
						<div>
							{renderRedirect(data)}
							<input
								type="submit"
								onClick={e => {
									e.preventDefault();
									Papa.parse(file[0], {
										header: header,
										download: true,
										skipEmptyLines: false,
										complete: ({ data }) =>
											uploadSheet({
												variables: {
													sheetData: data,
													expireIn: parseInt(expireIn),
													password: password,
												},
											}),
									});
								}}
								value="Upload File"
								disabled={disableSubmit}
							/>
						</div>
					)}
				</Mutation>
			</StyledForm>
		</StyledDiv>
	);
};

const StyledDiv = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	padding-top: 7rem;
	height: calc(100vh - 100px);
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

export default UploadPage;
