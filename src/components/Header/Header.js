import React, { Component } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import { Link, NavLink } from 'react-router-dom';

/** @class
 * @name Header
 * Top header element of page - always viewable
 *
 * @returns {JSX}
 */
export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			headerSize: 'large',
		};
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	/**
	 * Updates this.state.headerSize depending on how far
	 * scrolled from top
	 * @param {Object} Event
	 * @param {Number} scroll top override value otherwise based on document's scrollTop
	 */
	handleScroll = (e, scrollTop = document.documentElement.scrollTop) => {
		//distance from top in px at which to resize header
		const resize = 50;

		if (scrollTop > resize && this.state.headerSize !== 'small') {
			this.setState({
				headerSize: 'small',
			});
		} else if (scrollTop <= resize && this.state.headerSize !== 'large') {
			this.setState({
				headerSize: 'large',
			});
		}
	};

	render() {
		const { headerSize } = this.state;

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
	}
}

const Nav = styled(defaultStyle)`
	border-bottom: solid 1px ${props => props.theme.color.border};
	padding: 0.8rem;
	position: fixed;
	transition: all 0.3s;
	width: 100%;

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
`;

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
`;

const Tagline = styled.div`
	color: ${props => props.theme.color.lightText};
	position: absolute;
	display: inline-block;
	margin-left: 2rem;
	margin-top: 0.5rem;
	padding: 0.75rem 2rem;
	border-left: solid 1px ${props => props.theme.color.border};
`;
