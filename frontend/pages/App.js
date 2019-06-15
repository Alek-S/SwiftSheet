import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FrontPage from './FrontPage/FrontPage';
import UploadPage from './UploadPage/UploadPage';
import ViewPage from './ViewPage/ViewPage';
import SheetPage from './SheetPage/SheetPage';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import PrivacyPage from './PrivacyPage/PrivacyPage';

/** @function
 * @name App
 *
 * @returns {JSX}
 */
const App = ({ match }) => {
	return (
		<ScrollToTop>
			<Header />
			<Switch>
				<Route exact path="/" component={FrontPage} />
				<Route path="/privacy" component={PrivacyPage} />
				<Route path="/upload" component={UploadPage} />
				<Route path="/view" component={ViewPage} />
				<Route path="/:sheetId" component={SheetPage} />
			</Switch>
			<Footer />
		</ScrollToTop>
	);
};

export default hot(module)(App);
