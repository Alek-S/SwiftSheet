import styled from 'styled-components';

//Default styled div for others to extend from.
const defaultStyle = styled.div`
	background-color: white;
	color: ${props => props.theme.color.text};
	font-family: ${props => props.theme.font.main};
	font-size: 0.9em;
`;

export default defaultStyle;
