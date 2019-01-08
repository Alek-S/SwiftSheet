import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FrontPage from './FrontPage/FrontPage';
import UploadPage from './UploadPage/UploadPage';
import ViewPage from './ViewPage/ViewPage';

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
					<Route exact path="/" component={FrontPage} />
					<Route path="/upload" component={UploadPage} />
					<Route path="/view" component={ViewPage} />
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
