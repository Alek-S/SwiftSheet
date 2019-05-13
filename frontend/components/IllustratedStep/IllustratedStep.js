import React from 'react';
import styled from 'styled-components';

/** @function
 * @name IllustratedStep
 * Step with header body text and provided illustration;
 *
 * @returns {JSX}
 */
const IllustratedStep = ({ header, graphicPath, body, step, children }) => {
	return (
		<StyledSection>
			<img src={graphicPath} alt="illustration" width="180" />
			<header>
				<h2>
					<span className="step">{step}</span> {header}
				</h2>
			</header>
			<p>{children}</p>
		</StyledSection>
	);
};

const StyledSection = styled.section`
	margin: auto;
	padding-top: 4rem;
	padding-bottom: 4rem;

	img {
		float: left;
		margin-right: 4rem;
	}
	header {
		padding-top: 10px;
	}

	h2 {
		font-weight: 500;
		font-size: 1.4rem;
		letter-spacing: 1px;
		line-height: 175%;
	}

	p {
		margin-top: 1.5rem;
		margin-left: 20.5rem;
		font-size: 1rem;
		line-height: 175%;
		max-width: 600px;
	}

	a {
		color: ${props => props.theme.color.red};
	}

	.step {
		border: solid 1px ${props => props.theme.color.text};
		border-radius: 40px;
		padding: 0.5rem 1.5rem;
		font-weight: 400;
		margin-right: 0.75rem;
	}

	.highlight {
		/* background-color: rgba(255, 255, 0, .2); */
		color: #333;
		font-weight: 500;
		/* padding-left: .3rem;
		padding-right: .3rem; */
	}

	@media (max-width: 1200px) {
		width: 90%;
	}
	@media (max-width: 900px) {
		width: 98%;

		p {
			margin-top: 0.5rem;
			margin-left: 12rem;
			line-height: 150%;
		}
	}
`;

export { IllustratedStep };
