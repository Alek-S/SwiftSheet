import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';
import SearchSheet from '../../components/SearchSheet/SearchSheet';
import ReactGA from 'react-ga';

const ViewPage = () => {
	ReactGA.pageview('/view');

	return (
		<StyledDiv>
			<SearchSheet />
			<RecentlyViewed />
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

export default ViewPage;
