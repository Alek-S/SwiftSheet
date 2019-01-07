import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

import App from './pages/App.js';

const Root = () => (
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
