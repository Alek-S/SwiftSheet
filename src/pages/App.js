import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FrontPage from './FrontPage/FrontPage';
import UploadPage from './UploadPage/UploadPage';
import ViewPage from './ViewPage/ViewPage';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

/** @function
 * @name App
 *
 * @returns {JSX}
 */
const App = () => {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<Header />
				<Switch>
					<Route exact path="/" component={FrontPage} />
					<Route path="/upload" component={UploadPage} />
					<Route path="/view" component={ViewPage} />
				</Switch>
				<Footer />
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default hot(module)(App);
