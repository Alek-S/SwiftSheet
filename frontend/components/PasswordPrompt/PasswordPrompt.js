import React, { useState } from 'react';
import styled from 'styled-components';
import defaultStyle, { Card, ErrorDialog } from '../../defaultStyle';

/**
 * @function
 * @name PasswordPrompt
 * Prompts user to provide password
 *
 * @returns {JSX}
 */
export const PasswordPrompt = ({ setPassword, wrongPassword }) => {
	const [formValue, setFormValue] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		setPassword(formValue);
	};

	return (
		<StyledDiv>
			<StyledCard>
				<StyledForm onSubmit={handleSubmit}>
					<input
						type="password"
						autoComplete="current-password"
						value={formValue}
						onChange={({ target: { value } }) => setFormValue(value)}
						className={wrongPassword ? wrongPassword.toString() : undefined}
						placeholder="Sheet Password"
						minlength="6"
						required
					/>
					<SubmitButton type="submit" value="Submit">
						Submit
					</SubmitButton>
				</StyledForm>
			</StyledCard>

			<ErrorDialog
				className={wrongPassword ? wrongPassword.toString() : undefined}
			>
				⚠️ Incorrect Password Provided
			</ErrorDialog>
		</StyledDiv>
	);
};

const StyledDiv = styled(defaultStyle)`
	padding-top: 6rem;
	background-color: ${props => props.theme.color.background};
	height: calc(100vh - 80px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const StyledCard = styled(Card)`
	overflow: hidden;
	width: 90%;
	max-width: 500px;
	margin-bottom: 3rem;

	header {
		background: ${props => props.theme.gradient.greenBlue};
		padding-top: 1rem;
		padding-bottom: 1rem;
		width: 100%;
	}

	h2 {
		font-weight: 400;
		text-align: center;
		color: white;
		font-size: 1.1rem;
	}

	input {
		box-sizing: border-box;
		flex-grow: 2;
		height: 30px;
		margin-bottom: 0;
		padding-left: 2rem;
		margin-right: 1rem;
		font-size: 0.95rem;

		::placeholder {
			color: ${props => props.theme.color.backgroundDarkest};
		}
	}

	@media (max-width: 500px) {
		width: 95%;

		input {
			padding-left: 1rem;
			margin-right: 0;
		}
	}
`;

const StyledForm = styled.form`
	margin: 2rem;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;

	@media (max-width: 500px) {
		flex-direction: column;
		justify-content: center;
	}
`;

const SubmitButton = styled.button`
	outline: none;
	box-sizing: border-box;
	height: 30px;
	width: 100px !important;
	border-radius: 20px;
	background: ${props => props.theme.gradient.greenBlue};
	border: none;
	color: white !important;
	font-family: ${props => props.theme.font.main};
	font-size: 1rem;
	transition: all 0.5s;

	&:hover {
		box-shadow: ${props => props.theme.boxShadow};
	}
	@media (max-width: 500px) {
		width: 100%;
		margin: auto;
		margin-top: 2.5rem;
	}
`;
