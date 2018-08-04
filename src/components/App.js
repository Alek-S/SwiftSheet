import React from 'react';
import styled from 'styled-components';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Filedrop from './Filedrop/Filedrop';

/** @class
 * @name App
 *
 * @returns {JSX}
 */
export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Filedrop />
				<Body />
				<Footer />
			</div>
		);
	}
}

//TODO: remove Body - placeholder to test header/footer positions
/* istanbul ignore next*/
const Body = styled.div`
	background-color: ${props => props.theme.color.background};
	height: 1500px;
`;
