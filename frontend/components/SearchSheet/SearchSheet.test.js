import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-styled-components';

import SearchSheet from './SearchSheet';
import theme from '../../theme';

describe('SearchSheet', () => {
	test('matches the snapshot', () => {
		const tree = mount(
			<Router>
				<ThemeProvider theme={theme}>
					<SearchSheet />
				</ThemeProvider>
			</Router>
		);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
