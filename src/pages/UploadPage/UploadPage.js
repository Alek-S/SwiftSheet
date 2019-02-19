import React, { useState } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import Filedrop from '../../components/Filedrop/Filedrop';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

const UPLOAD_SHEET = gql`
	mutation UPLOAD_SHEET($sheetData: JSON!, $expireIn: Int!) {
		createSheet(sheetData: $sheetData, expireIn: $expireIn) {
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
	const [sheetData, setSheetData] = useState();
	const [redirect, setRedirect] = useState(false);

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
		setHeader(!header);
	};

	/**
	 * @function
	 * Handle response from <FileDrop />
	 * @param {object} response - converted data from FileDrop
	 */
	const handleJSONData = response => {
		setSheetData(response.data);
		setDisableSubmit(false);
	};

	const onCompleted = data => {
		const id = data.createSheet._id;
		setRedirect(true);
	};

	const renderRedirect = data => {
		const id = data && data.createSheet._id;
		if (redirect) {
			return <Redirect to={`/${id}`} />;
		}
	};

	return (
		<StyledDiv>
			<Filedrop firstRowHeader={header} handleJSONData={handleJSONData} />
			<StyledForm disableSubmit={disableSubmit}>
				<Options>
					<label>
						Expires In:
						<select value={expireIn} onChange={_handleChange}>
							<option value={4}>4 Hours</option>
							<option value={8}>8 Hours</option>
							<option value={24}>1 Day</option>
							<option value={72}>3 Days</option>
							<option value={120}>5 Days</option>
						</select>
					</label>
					<HeaderToggle active={header}>
						<span>First Row Header:</span>
						<button onClick={_toggleHeader}>{header ? 'Yes' : 'No'}</button>
					</HeaderToggle>
				</Options>
				<Mutation mutation={UPLOAD_SHEET} onCompleted={onCompleted}>
					{(uploadSheet, { loading, error, data }) => (
						<div>
							{renderRedirect(data)}
							<input
								type="submit"
								onClick={e => {
									e.preventDefault();
									uploadSheet({
										variables: { sheetData, expireIn: parseInt(expireIn) },
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
		margin-top: 4rem;
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

const Options = styled.div`
	background-color: ${props => props.theme.color.backgroundDark};
	border-radius: 3px;
	padding-top: 1rem;
	padding-bottom: 1rem;
`;

export default UploadPage;
