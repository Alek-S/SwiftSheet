import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';

import { PasswordPrompt, StyledDiv } from './PasswordPrompt';
import theme from '../../theme';

const setMockPassword = jest.fn();

describe('PasswordPrompt', () => {
	test('matches the snapshot', () => {
		const wrongPassword = true;

		const tree = shallowWithTheme(
			<PasswordPrompt
				password="mockPassword"
				setPassword={setMockPassword}
				wrongPassword={wrongPassword}
			/>,
			theme
		).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('StyledDiv matches the snapshot', () => {
		const tree = renderer.create(<StyledDiv theme={theme} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('should handle submit of password input', () => {
		const setPassword = jest.fn();

		const ui = render(
			<ThemeProvider theme={theme}>
				<PasswordPrompt setPassword={setPassword} />
			</ThemeProvider>
		);

		const input = ui.getByLabelText('password input');
		fireEvent.change(input, { target: { value: 123 } });

		fireEvent.click(ui.getByText('Submit'));

		expect(setPassword).toHaveBeenCalledWith('123');
	});
});
