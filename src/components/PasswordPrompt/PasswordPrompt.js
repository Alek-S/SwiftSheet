import React from 'react';
import styled from 'styled-components';
import defaultStyle, { Card, ErrorDialog } from '../../defaultStyle';

/**
 * @function
 * @name PasswordPrompt
 * Prompts user to provide password
 *
 * @returns {JSX}
 */
export const PasswordPrompt = ({ password, setPassword, wrongPassword }) => (
	<StyledDiv>
		<StyledForm>
			<input
				type="password"
				autoComplete="current-password"
				value={password}
				onChange={({ target: { value } }) => setPassword(value)}
				className={wrongPassword && wrongPassword.toString()}
				placeholder="Sheet Password"
			/>
		</StyledForm>

		<ErrorDialog className={wrongPassword}>
			⚠️ Incorrect Password Provided
		</ErrorDialog>
	</StyledDiv>
);

const StyledDiv = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	height: calc(100vh - 55px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const StyledForm = styled(Card)`
	margin-bottom: 1rem;
	padding: 2.5rem 4rem;

	input {
		height: 30px;
		padding: 0.2rem 1.5rem;
		font-size: 1rem;
		font-weight: 300;
		width: 200px;
	}
`;
