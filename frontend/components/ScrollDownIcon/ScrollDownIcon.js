import React from 'react';
import styled, { keyframes } from 'styled-components';

/** @function
 * @name ScrollDownIcon
 * animated mouse scroll icon
 * based on: https://codepen.io/shakdaniel/pen/JoKOQx
 * @returns {JSX}
 */
const ScrollDownIcon = () => (
	<ScrollDownAnimation>
		<p>Scroll Down</p>
	</ScrollDownAnimation>
);

const scrollAnimation = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		-webkit-transform: translateY(46px);
		transform: translateY(46px);
	}
`;

const ScrollDownAnimation = styled.div`
	width: 40px;
	height: 70px;
	margin-left: -20px;
	top: 50%;
	margin-top: -35px;
	box-shadow: inset 0 0 0 1px ${props => props.theme.color.red};
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 25px;

	&,
	&:before {
		position: absolute;
		left: 50%;
		top: calc(100vh - 150px);
		z-index: 10;
	}

	&:before {
		content: '';
		width: 8px;
		height: 8px;
		background: ${props => props.theme.color.red};
		margin-left: -4px;
		top: 8px;
		border-radius: 4px;
		-webkit-animation-duration: 1.5s;
		animation-duration: 1.5s;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-name: scroll;
		animation-name: ${scrollAnimation};
	}

	p {
		position: relative;
		bottom: -80px;
		color: ${props => props.theme.color.red};
		font-family: ${props => props.theme.font.main};
		font-size: 1rem;
		font-weight: 400;
		text-align: center;
		line-height: 120%;
	}

	@media (max-width: 475px) {
		margin-top: -85px;
	}
`;

export default ScrollDownIcon;
