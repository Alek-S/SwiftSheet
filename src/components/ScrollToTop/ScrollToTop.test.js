import React from 'react';
import 'jest-styled-components';

import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<ScrollToTop />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
