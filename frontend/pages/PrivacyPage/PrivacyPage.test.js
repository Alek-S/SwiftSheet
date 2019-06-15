import React from 'react';
import 'jest-styled-components';

import PrivacyPage from './PrivacyPage';
import theme from '../../theme';

describe('Footer', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(<PrivacyPage />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
