import React from 'react';
import styled from 'styled-components';
// import defaultStyle from '../../defaultStyle';
import ScrollDownIcon from '../../components/ScrollDownIcon/ScrollDownIcon';

const FrontPage = () => (
	<div>
		<HeroImg />
		<StyledHeader>
			<img src="./assets/images/logo-sheet.svg" alt="logo" height="150" />
			Quickly share a spreadsheet, then make it go away.
		</StyledHeader>
		<ScrollDownIcon />
	</div>
);

const HeroImg = styled.div`
	background-image: url('assets/images/banner-lg.jpg');
	height: 100vh;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`;

const StyledHeader = styled.h3`
	position: absolute;
	top: 100px;
	font-family: ${props => props.theme.font.main};
	color: ${props => props.theme.color.red};
	width: 60%;
	padding-left: 2rem;
	padding-right: 0;
	line-height: 145%;
	font-size: 6.5rem;

	img {
		position: relative;
		top: 2.8rem;
		margin-right: 1.5rem;
	}
`;

export default FrontPage;
