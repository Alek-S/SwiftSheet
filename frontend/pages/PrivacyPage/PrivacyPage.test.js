import React from 'react';
import 'jest-styled-components';

import PrivacyPage from './PrivacyPage';
import theme from '../../theme';

describe('Footer', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<PrivacyPage theme={theme} />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
