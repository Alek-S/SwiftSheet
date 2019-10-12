import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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

	test('should handle submit of id input', () => {
		const ui = render(
			<Router>
				<ThemeProvider theme={theme}>
					<SearchSheet />
				</ThemeProvider>
			</Router>
		);

		const input = ui.getByLabelText('input search id');
		fireEvent.change(input, { target: { value: 123 } });

		fireEvent.click(ui.getByText('Submit'));
		expect(input.value).toBe('123');
	});
});
