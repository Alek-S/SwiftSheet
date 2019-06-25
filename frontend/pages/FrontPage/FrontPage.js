import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import ScrollDownIcon from '../../components/ScrollDownIcon/ScrollDownIcon';
import { IllustratedStep } from '../../components/IllustratedStep/IllustratedStep';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga';

const FrontPage = () => {
	ReactGA.pageview('/');

	return (
		<div>
			<HeroImg />
			<StyledHeader>
				<img src="./assets/images/logo-sheet.svg" alt="logo" height="150" />
				Upload a CSV to share an online spreadsheet or mock API that
				auto-deletes after expiration. No account needed.
			</StyledHeader>
			<ScrollDownIcon />
			<InfoSection>
				<IllustratedStep
					step={1}
					graphicPath="./assets/images/upload-simple.svg"
					header="Upload a CSV File & Set Expiration Time"
				>
					Go to <NavLink to="/upload">Upload</NavLink> section and drag a file
					into the upload area. From there{' '}
					<span className="highlight">
						set how long until the sheet expires
					</span>
					, if the sheet has a header, and an optional password.
				</IllustratedStep>
				<IllustratedStep
					step={2}
					graphicPath="./assets/images/share.svg"
					header="Get a Shareable Link or API Endpoint"
				>
					Once Uploaded, share the{' '}
					<span className="highlight">link to an interactive spreadsheet</span>{' '}
					with filtering and sorting. Additionally, for the developer crowd, get
					temporary{' '}
					<span className="highlight">API endpoints for REST or GraphQL</span>{' '}
					perfect for quick mocking.
				</IllustratedStep>
				<IllustratedStep
					step={3}
					graphicPath="./assets/images/not-found.svg"
					header="The Sheet is Deleted Once Expired"
				>
					When the sheet reaching the expiration time, it is{' '}
					<span className="highlight">
						automatically deleted from the database
					</span>
					, and no longer shareable.
				</IllustratedStep>
			</InfoSection>
		</div>
	);
};

const HeroImg = styled.div`
	background-image: url('assets/images/banner-lg.jpg');
	height: 100vh;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`;

const StyledHeader = styled.h3`
	position: absolute;
	top: 100px;
	font-family: ${props => props.theme.font.main};
	color: ${props => props.theme.color.red};
	width: 60%;
	padding-left: 2rem;
	padding-right: 0;
	line-height: 145%;
	font-size: 5.5rem;

	img {
		position: relative;
		top: 2.8rem;
		margin-right: 1.5rem;
	}

	@media (max-height: 1150px) {
		font-size: 4.5rem;
		img {
			top: 1.5rem;
			height: 100px;
		}
	}
	@media (max-height: 800px) {
		font-size: 3.5rem;
		line-height: 125%;
	}

	@media (max-width: 1250px) {
		font-size: 4.75rem;
		img {
			top: 1.5rem;
			height: 100px;
		}
	}
	@media (max-width: 1450px) {
		font-size: 4.4rem;
		line-height: 170%;
		img {
			top: 1.5rem;
			height: 100px;
		}
	}
	@media (max-height: 975px) {
		font-size: 4.2rem;
		line-height: 118%;
		width: 60%;
		img {
			top: 0.8rem;
			height: 72px;
		}
	}
	@media (max-height: 875px) {
		font-size: 3.8rem;
		line-height: 118%;
		width: 60%;
		img {
			top: 0.8rem;
			height: 72px;
		}
	}
	/* ipad landscape */
	@media (max-width: 1050px) {
		font-size: 3.2rem;
		line-height: 150%;
		img {
			top: 1.4rem;
			height: 80px;
		}
	}
	@media (max-width: 815px) {
		font-size: 3.5rem;
		line-height: 125%;
		width: 75%;
		img {
			top: 1rem;
			height: 80px;
		}
	}
	@media (max-width: 475px) {
		top: 50px;
		font-size: 2.2rem;
		line-height: 155%;
		padding-left: 0.5rem;
		width: 80%;
		img {
			top: 1.2rem;
			height: 50px;
		}
	}
	@media (max-width: 350px) {
		top: 50px;
		font-size: 1.5rem;
		line-height: 120%;
		padding-left: 0.5rem;
		width: 82%;
		img {
			top: 1.2rem;
			height: 60px;
			margin-right: 1rem;
		}
	}
`;

const InfoSection = styled(defaultStyle)`
	padding-top: 100px;
	padding-bottom: 50px;
	background-color: ${props => props.theme.color.aqua};
	display: flex;
	flex-direction: column;
	justify-content: center;

	&:before {
		content: '';
		position: absolute;
		left: 0;
		top: 100%;
		height: 100px;
		width: 100%;
		transform-origin: 0 0;
		transform: skewY(-2deg);
		background-color: ${props => props.theme.color.aqua};
	}

	@media (max-width: 475px) {
		padding-top: 10px;
		&:before {
			display: none;
		}
	}
`;

export default FrontPage;
