import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Filedrop from './Filedrop/Filedrop';

/** @function
 * @name App
 *
 * @returns {JSX}
 */
const App = () => {
	return (
		<div>
			<Header />
			<Filedrop />
			<Body />
			<Footer />
		</div>
	);
};

//TODO: remove Body - placeholder to test header/footer positions
/* istanbul ignore next*/
const Body = styled.div`
	background-color: ${props => props.theme.color.background};
	height: 1500px;
`;

export default hot(module)(App);
