import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import { PasswordPrompt, StyledDiv } from './PasswordPrompt';
import theme from '../../theme';

const setMockPassword = jest.fn();

describe('PasswordPrompt', () => {
	it('matches the snapshot', () => {
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
});
