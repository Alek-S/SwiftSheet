import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import theme from './theme';
import App from './pages/App.js';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql', //TODO
});

const Root = () => (
	<ApolloProvider client={client}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
