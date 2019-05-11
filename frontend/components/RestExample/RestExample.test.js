import React from 'react';
import 'jest-styled-components';

import { RestExample } from './RestExample';
import theme from '../../theme';

describe('RestExample', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(
			<RestExample host="mockHost.com" id="42" />,
			theme
		).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
