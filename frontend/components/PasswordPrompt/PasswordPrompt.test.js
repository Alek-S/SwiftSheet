import React from 'react';
import 'jest-styled-components';

import { PasswordPrompt } from './PasswordPrompt';
import theme from '../../theme';

const setMockPassword = jest.fn();

describe('PasswordPrompt', () => {
	it.only('matches the snapshot', () => {
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
});
