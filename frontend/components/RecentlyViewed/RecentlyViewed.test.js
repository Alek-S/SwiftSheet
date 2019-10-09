import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import RecentlyViewed, { StyledCard } from './RecentlyViewed';
import theme from '../../theme';

describe('RecentlyViewed', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(<RecentlyViewed />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('StyledCard matches the snapshot', () => {
		const tree = renderer.create(<StyledCard theme={theme} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
