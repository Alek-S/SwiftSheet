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
			<Link to="/privacy">Privacy Policy</Link>
		</Styledfooter>
	);
}

const Styledfooter = styled(defaultStyle)`
	box-sizing: border-box;
	padding: 1rem;
	padding-top: 1.25rem;
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
