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
			<div>
				Created with 🍷 by{' '}
				<a href="https://www.alekshnayder.com/" target="_blank" rel="noopener">
					Alek Shnayder
				</a>
			</div>
			<Spacer>|</Spacer>
			<div>
				<IconLink
					style={{ marginRight: '1rem' }}
					href="mailto:swiftsheetapp@example.com?Subject=Hello"
					target="_top"
					rel="noopener"
				>
					<img src="./assets/images/mail.svg" alt="logo" height="22" />
				</IconLink>
				<IconLink
					href="https://twitter.com/SwiftSheetApp"
					target="_blank"
					rel="noopener"
				>
					<img src="./assets/images/twitter.svg" alt="logo" height="25" />
				</IconLink>
			</div>
			<Spacer>|</Spacer>
			<div>
				<Link to="/privacy">Privacy Policy</Link>
			</div>
			<Spacer>|</Spacer>
			<div>
				<Link to="/terms">Terms of Service</Link>
			</div>
		</Styledfooter>
	);
}

const Styledfooter = styled(defaultStyle)`
	box-sizing: border-box;
	padding: 1rem;
	margin-top: 0.5rem;
	text-align: center;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;

	& a {
		color: ${props => props.theme.color.text};
	}

	@media (max-width: 500px) {
		flex-direction: column;
		div {
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
		}
	}
`;

const Spacer = styled.span`
	margin-left: 1rem;
	margin-right: 1rem;

	@media (max-width: 500px) {
		display: none;
	}
`;

const IconLink = styled.a`
	position: relative;
	top: -5px;

	@media (max-width: 500px) {
		top: 0;
	}
`;

export { Styledfooter };
