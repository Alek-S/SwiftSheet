import React from 'react';
import styled from 'styled-components';


export default function Header() {
	return (
		<Nav>
			<img src='./assets/images/logo.svg' alt='logo' height='40px'/> <h1>SwiftSheet</h1>
		</Nav>
	)
}


const Nav = styled.nav`
	border-bottom: solid 1px ${props => props.theme.color.border};
	padding: .75rem;

	& img, h1{
		display:inline;
	}
	& h1{
		position: relative;
		top: -.6rem;
		font-size: 2rem;
	}
`