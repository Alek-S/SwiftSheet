import React from 'react';
import 'jest-styled-components';

import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
	it('matches the snapshot', () => {
		const tree = shallow(<ScrollToTop />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
