import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import wait from 'waait';
import 'jest-styled-components';

import UploadPage from './UploadPage';
import theme from '../../theme';

describe('UploadPage', () => {
	test('matches the snapshot', () => {
		const wrapper = mount(
			<MockedProvider mocks={[]} addTypename={false}>
				<Router>
					<ThemeProvider theme={theme}>
						<UploadPage />
					</ThemeProvider>
				</Router>
			</MockedProvider>
		);

		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
