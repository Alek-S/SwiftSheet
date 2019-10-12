import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import { Link, NavLink } from 'react-router-dom';

/**
 * @function
 * @name Header
 * Top header element of page - always viewable
 *
 * @returns {JSX}
 */
const Header = () => {
	const [headerSize, setHeaderSize] = useState('large');

	useEffect(() => {
		window.addEventListener('scroll', _handleScroll);

		return () => {
			window.removeEventListener('scroll', _handleScroll);
		};
	});

	/**
	 * @function
	 * Updates headerSize state
	 * depending on how far scrolled from top
	 */
	const _handleScroll = () => {
		const scrollTop = document.documentElement.scrollTop;
		const resize = 50; //distance from top in px at which to resize header

		if (scrollTop > resize && headerSize !== 'small') {
			setHeaderSize('small');
		} else if (scrollTop <= resize && headerSize !== 'large') {
			setHeaderSize('large');
		}
	};

	return (
		<Nav className={headerSize}>
			<Link to="/">
				<img src="./assets/images/logo.svg" alt="logo" /> <h1>SwiftSheet</h1>
			</Link>
			<Tagline className="tagline">
				<h2>Fast and ephemeral data sharing.</h2>
			</Tagline>

			<NavSection className={headerSize}>
				<StyledNavLink to="/upload">Upload</StyledNavLink>
				<StyledNavLink to="/view">View</StyledNavLink>
			</NavSection>
		</Nav>
	);
};

const Nav = styled(defaultStyle)`
	position: fixed;
	border-bottom: solid 1px ${props => props.theme.color.border};
	padding: 0.8rem;
	transition: all 0.3s;
	width: 100%;
	z-index: 50;

	a {
		text-decoration: none;
	}

	& img,
	h1 {
		display: inline;
		transition: all 0.3s;
	}
	& img {
		height: 50px;
	}
	& h1 {
		font-family: ${props => props.theme.font.header};
		font-size: 2.5rem;
		letter-spacing: 4px;
		margin-left: 0.5rem;
		position: relative;
		top: -0.7rem;
		color: ${props => props.theme.color.text};
	}

	&.small {
		padding: 0.4rem;
		padding-left: 0.8rem;
		padding-bottom: 0.15rem;

		img {
			height: 25px;
		}
		h1 {
			font-size: 1.5rem;
			top: -0.3rem;
		}
		.tagline {
			display: none;
		}
	}

	@media (max-width: 475px) {
		h1 {
			top: -0.3rem;
			font-size: 1.25rem;
		}
		img {
			height: 25px;
		}
	}

	@media (max-width: 350px) {
		h1 {
			top: 0rem;
			font-size: 1.15rem;
		}
		img {
			position: relative;
			height: 20px;
			top: 0.25rem;
		}
	}
`;

const NavSection = styled.ul`
	position: absolute;
	top: 1.75rem;
	right: 2rem;
	transition: all 0.3s;
	&.small {
		top: 0.6rem;
	}
	&.small * {
		font-size: 1rem;
	}

	@media (max-width: 475px) {
		top: 1.2rem;
	}
`;

/* istanbul ignore next */
const StyledNavLink = styled(NavLink)`
	font-size: 1.25rem;
	color: ${props => props.theme.color.text};
	padding-right: 2rem;
	padding-left: 2rem;
	transition: all 0.3s;
	border-left: solid 1px ${props => props.theme.color.border};

	&.active {
		font-weight: 500;
		color: ${props => props.theme.color.red};
	}

	@media (max-width: 550px) {
		& {
			font-size: 1.1rem;
			padding-right: 1rem;
			padding-left: 1rem;
		}
	}

	@media (max-width: 350px) {
		padding-right: 0.5rem;
		padding-left: 0.5rem;
	}
`;

const Tagline = styled.div`
	color: ${props => props.theme.color.lightText};
	position: absolute;
	display: inline-block;
	margin-left: 2rem;
	margin-top: 0.5rem;
	padding: 0.75rem 2rem;
	border-left: solid 1px ${props => props.theme.color.border};

	@media (max-width: 835px) {
		& {
			display: none;
		}
	}
`;

export default Header;
export { Nav, StyledNavLink, Tagline };
