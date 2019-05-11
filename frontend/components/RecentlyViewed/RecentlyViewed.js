import React from 'react';
import styled from 'styled-components';
import { Card } from '../../defaultStyle';
import { getHistory } from '../../utils/history';
import { Link } from 'react-router-dom';

const RecentlyViewed = () => {
	const listHistory = getHistory()
		? getHistory().map((item, i) => (
				<Link to={`/${item}`} key={`${item.toString()}-${i}`}>
					<li>{item}</li>
				</Link>
		  ))
		: null;

	return (
		<StyledCard>
			<header>
				<h2>Recently Viewed Sheets</h2>
			</header>
			{listHistory ? (
				<ul>{listHistory}</ul>
			) : (
				<p className="no-items">No recently viewed items</p>
			)}
		</StyledCard>
	);
};

const StyledCard = styled(Card)`
	padding-left: 0px;
	padding-right: 0px;
	padding-top: 0;
	overflow: hidden;
	width: 90%;
	max-width: 600px;

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

	.no-items {
		font-style: italic;
		padding-top: 3rem;
		padding-bottom: 3rem;
		text-align: center;
		font-size: 0.9rem;
		color: ${props => props.theme.color.text};
	}

	a {
		text-decoration: none;
		color: ${props => props.theme.color.text};
	}

	li {
		font-size: 0.9rem;
		color: ${props => props.theme.color.text};
		padding-left: 1.5rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		margin: 1rem;
		border-radius: 8px;
		border: 1px solid ${props => props.theme.color.border};
		text-align: center;
		transition: all 0.25s;
	}
	li:hover {
		border: 1px solid ${props => props.theme.color.aqua};
		background-color: ${props => props.theme.color.background};
	}
`;

export default RecentlyViewed;
