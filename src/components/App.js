import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
		<BrowserRouter>
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Filedrop} />
				</Switch>
				<Body />
				<Footer />
			</div>
		</BrowserRouter>
	);
};

//TODO: remove Body - placeholder to test header/footer positions
/* istanbul ignore next*/
const Body = styled.div`
	background-color: ${props => props.theme.color.background};
	height: 1500px;
`;

export default hot(module)(App);
