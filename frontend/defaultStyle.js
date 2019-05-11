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
	/* text-align: center; */

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
`;

export default defaultStyle;
export { Card, ErrorDialog, ApiCard };
