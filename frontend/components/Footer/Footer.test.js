import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import Footer, { Styledfooter } from './Footer';
import theme from '../../theme';

describe('Footer', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(<Footer />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});

describe('Styledfooter', () => {
	const tree = renderer.create(<Styledfooter theme={theme} />).toJSON();

	test('matches the snapshot', () => {
		expect(tree).toMatchSnapshot();
	});
});
