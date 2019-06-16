import React from 'react';
import 'jest-styled-components';

import TermsPage from './TermsPage';
import theme from '../../theme';

describe('Footer', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(<TermsPage />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
