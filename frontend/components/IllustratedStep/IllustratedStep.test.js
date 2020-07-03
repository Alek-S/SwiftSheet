import React from 'react';
import 'jest-styled-components';

import { IllustratedStep } from './IllustratedStep';
import theme from '../../theme';

describe('Footer', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<IllustratedStep theme={theme} />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
