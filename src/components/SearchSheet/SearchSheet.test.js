import React from 'react';
import 'jest-styled-components';

import SearchSheet from './SearchSheet';
import theme from '../../theme';

describe('SearchSheet', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<SearchSheet />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
