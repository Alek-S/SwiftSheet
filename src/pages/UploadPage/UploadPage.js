import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import Filedrop from '../../components/Filedrop/Filedrop';

const StyledDiv = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	padding-top: 7rem;
`;

const UploadPage = () => (
	<StyledDiv>
		<Filedrop />
	</StyledDiv>
);

export default UploadPage;
