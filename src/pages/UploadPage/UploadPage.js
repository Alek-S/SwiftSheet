import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import Filedrop from '../../components/Filedrop/Filedrop';

const StyledDiv = styled(defaultStyle)`
	padding-top: 7rem;
	padding-bottom: 2rem;
	padding-left: 2rem;
	font-size: 1.2rem;
`;

const UploadPage = () => (
	<div>
		<StyledDiv>Upload Page</StyledDiv>
		<Filedrop />
	</div>
);

export default UploadPage;
