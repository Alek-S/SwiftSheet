import styled from 'styled-components';

//Default styled div for others to extend from.
const defaultStyle = styled.div`
	background-color: white;
	color: ${props => props.theme.color.text};
	font-family: ${props => props.theme.font.main};
	font-size: 0.9em;
`;

const Card = styled(defaultStyle)`
	border-radius: 8px;
	box-shadow: ${props => props.theme.boxShadowLight};

	input {
		outline: none;
		color: ${props => props.theme.color.text};
		font-family: ${props => props.theme.font.main};
		background-color: ${props => props.theme.color.input};
		border: 1px solid ${props => props.theme.color.input};
		border-radius: 5rem;
		transition: all 0.3s;

		::placeholder {
			font-size: 1rem;
			font-weight: 400;
			font-style: italic;
			font-family: ${props => props.theme.font.main};
			color: ${props => props.theme.color.lightText};
		}

		&:hover {
			border: solid 1px ${props => props.theme.color.border};
		}

		&:focus,
		&:active {
			border: solid 1px ${props => props.theme.color.blue};
		}

		&.true {
			border: 1px solid ${props => props.theme.color.red};
		}
	}
`;

const ErrorDialog = styled.div`
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

const ApiCard = styled(Card)`
	width: 500px;
	padding: 1rem;
	margin: auto;
	margin-top: 1rem;
	background-color: #424242;
	color: ${props => props.theme.color.backgroundDarkest};

	a {
		margin-left: 1rem;
		color: ${props => props.theme.color.aqua};
	}

	.pill {
		background: ${props => props.theme.gradient.greenBlue};
		color: white;
		padding: 0.1rem 0.5rem;
		border-radius: 4px;
	}
	.pill-secondary {
		background-color: #595959;
		color: white;
		padding: 0.1rem 0.5rem;
		border-radius: 4px;
	}
	.gql_query {
		margin-left: 0.5rem;
		color: ${props => props.theme.color.backgroundDark};
	}

	.query_title {
		margin-top: 0.75rem;
	}

	@media (max-width: 535px) {
		width: 90%;
		overflow: none;
		word-wrap: break-word;
		.pill,
		.pill-secondary {
			display: block;
			width: fit-content;
			margin-bottom: 0.5rem;
		}
		a,
		.gql_query {
			margin-left: 0;
		}
	}
`;

/** Card specific for form - password & search */
const FormCard = styled(Card)`
	overflow: hidden;
	width: 90%;
	max-width: 600px;
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

/** Form for use inside of FormCard */
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

/** Submit Button for use inside of FormCard */
const SubmitButton = styled.button`
	cursor: pointer;
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

export default defaultStyle;
export { Card, ErrorDialog, ApiCard, FormCard, StyledForm, SubmitButton };
