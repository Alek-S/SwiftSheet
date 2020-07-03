import React from 'react';
import 'jest-styled-components';

import TermsPage from './TermsPage';
import theme from '../../theme';

describe('Footer', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<TermsPage theme={theme} />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
