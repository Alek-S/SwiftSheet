import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import App from './pages/App.js';
import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';

const client = new ApolloClient({ uri: '/graphql' });
if (process.env.NODE_ENV !== 'development') {
	Sentry.init({
		dsn: 'https://25efc34f41e746fb9b5c220c8b6c5bdc@sentry.io/1462960',
	});

	ReactGA.initialize('UA-142126109-1');
	ReactGA.pageview(window.location.pathname + window.location.search);
}

const Root = () => (
	<ApolloProvider client={client}>
		<Router>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Router>
	</ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
