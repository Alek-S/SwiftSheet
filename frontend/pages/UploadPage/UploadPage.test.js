import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, getByLabelText } from '@testing-library/react';
import wait from 'waait';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

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

	test('it should start with upload button disabled', () => {
		const ui = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<Router>
					<ThemeProvider theme={theme}>
						<UploadPage />
					</ThemeProvider>
				</Router>
			</MockedProvider>
		);

		const uploadButton = ui.getByLabelText('upload button');
		expect(uploadButton).toBeDisabled();
	});
});
