import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';

/** @function
 * @name Footer
 * Bottom footer element of page - always viewable
 *
 * @returns {JSX}
 */
export default function Footer() {
	return (
		<Styledfooter>
			Created by{' '}
			<a href="https://www.alekshnayder.com/" target="_blank" rel="noopener">
				Alek Shnayder
			</a>
		</Styledfooter>
	);
}

const Styledfooter = styled(defaultStyle)`
	padding: 1rem;
	text-align: center;
	width: 100%;

	& a {
		color: ${props => props.theme.color.text};
	}
`;
