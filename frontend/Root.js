import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import App from './pages/App.js';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql', //TODO
});

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
