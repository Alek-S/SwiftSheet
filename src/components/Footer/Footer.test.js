import React from 'react';
import 'jest-styled-components';

import Footer from './Footer';
import theme from '../../theme';


describe('Footer', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<Footer />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});