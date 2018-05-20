import React from 'react';
import styled from 'styled-components';


/** @function 
 * @name Footer
 * Bottom footer element of page - always viewable
 * 
 * @returns {JSX}
*/
export default function Footer() {
	return(
		<Styledfooter>
			Created by <a href='https://www.alekshnayder.com/' target="_blank" rel="noopener">Alek Shnayder</a>
		</Styledfooter>
	);
}

const Styledfooter = styled.footer`
	color: ${props => props.theme.color.text};
	width: 100%;
	background-color: white;
	padding: 1rem;
	text-align: center;
	font-size: .9em;
	font-family: ${props => props.theme.font.main};

	& a{
		color: ${props => props.theme.color.text};
	}
`