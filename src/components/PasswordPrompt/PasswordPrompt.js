import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';

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

		<WrongPassword className={wrongPassword}>
			⚠️ Incorrect Password Provided
		</WrongPassword>
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

const StyledForm = styled.form`
	margin-bottom: 1rem;
	background-color: white;
	padding: 2.5rem 4rem;
	border-radius: 8px;
	box-shadow: ${props => props.theme.boxShadowLight};

	input {
		outline: none;
		height: 30px;
		background-color: ${props => props.theme.color.input};
		padding: 0.2rem 1.5rem;
		border: 1px solid ${props => props.theme.color.input};
		border-radius: 5rem;
		font-size: 1rem;
		font-weight: 300;
		color: ${props => props.theme.color.text};
		font: ${props => props.theme.font.main};
		transition: all 0.3s;
		width: 200px;

		::placeholder {
			font-size: 1rem;
			font-weight: 300;
			font: ${props => props.theme.font.main};
			color: ${props => props.theme.color.lightText};
		}

		&:hover {
			border: solid 1px ${props => props.theme.color.border};
		}

		&:focus {
			border: 1px solid ${props => props.theme.color.blue};
		}

		&.true {
			border: 1px solid ${props => props.theme.color.red};
		}
	}
`;

const WrongPassword = styled.div`
	text-align: center;
	opacity: 0;
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	background-color: ${props => props.theme.color.red};
	transition: all 0.3s;

	&.true {
		opacity: 1;
	}
`;
