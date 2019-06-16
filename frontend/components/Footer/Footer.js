import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import { Link } from 'react-router-dom';

/** @function
 * @name Footer
 * Bottom footer element of page - always viewable
 *
 * @returns {JSX}
 */
export default function Footer() {
	return (
		<Styledfooter>
			Created with 🍷 by{' '}
			<a href="https://www.alekshnayder.com/" target="_blank" rel="noopener">
				Alek Shnayder
			</a>
			<Spacer>|</Spacer>
			<IconLink
				style={{ marginRight: '1rem' }}
				href="mailto:swiftsheetapp@example.com?Subject=Hello"
				target="_top"
				rel="noopener"
			>
				<img src="./assets/images/mail.svg" alt="logo" height="22" />
			</IconLink>
			<IconLink
				href="https://twitter.com/SheetSwift"
				target="_blank"
				rel="noopener"
			>
				<img src="./assets/images/twitter.svg" alt="logo" height="25" />
			</IconLink>
			<Spacer>|</Spacer>
			<Link to="/privacy">Privacy Policy</Link>
			<Spacer>|</Spacer>
			<Link to="/terms">Terms of Service</Link>
		</Styledfooter>
	);
}

const Styledfooter = styled(defaultStyle)`
	box-sizing: border-box;
	padding: 1rem;
	margin-bottom: 0.5rem;
	text-align: center;
	width: 100%;

	& a {
		color: ${props => props.theme.color.text};
	}
`;

const Spacer = styled.span`
	margin-left: 1rem;
	margin-right: 1rem;
`;

const IconLink = styled.a`
	position: relative;
	top: 7px;
`;
