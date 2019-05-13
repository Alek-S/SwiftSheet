import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import FrontPage from './FrontPage';
import theme from '../../theme';

describe('FrontPage', () => {
	test('matches the snapshot', () => {
		const wrapper = renderer.create(
			<Router>
				<ThemeProvider theme={theme}>
					<FrontPage />
				</ThemeProvider>
			</Router>
		);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
