import React, { useState } from 'react';
import styled from 'styled-components';
import defaultStyle, {
	Card,
	ErrorDialog,
	FormCard,
	StyledForm,
	SubmitButton,
} from '../../defaultStyle';

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
			<PasswordFormCard>
				<StyledForm onSubmit={handleSubmit}>
					<input
						type="password"
						autoComplete="current-password"
						value={formValue}
						onChange={({ target: { value } }) => setFormValue(value)}
						className={wrongPassword ? wrongPassword.toString() : undefined}
						placeholder="Sheet Password"
						minLength="6"
						required
					/>
					<SubmitButton type="submit" value="Submit">
						Submit
					</SubmitButton>
				</StyledForm>
			</PasswordFormCard>

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

const PasswordFormCard = styled(FormCard)`
	max-width: 475px;
`;

export { StyledDiv };
