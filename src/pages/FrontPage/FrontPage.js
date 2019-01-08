import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import defaultStyle from '../../defaultStyle';

const StyledDiv = styled(defaultStyle)`
	padding-top: 20rem;
`;

const FrontPage = () => (
	<StyledDiv>
		Front Page
		<Link to="/upload">upload</Link>
		<Link to="/view">view</Link>
	</StyledDiv>
);

export default FrontPage;
