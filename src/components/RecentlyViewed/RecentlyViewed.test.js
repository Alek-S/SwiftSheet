import React from 'react';
import 'jest-styled-components';

import RecentlyViewed from './RecentlyViewed';
import theme from '../../theme';

describe('RecentlyViewed', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<RecentlyViewed />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
