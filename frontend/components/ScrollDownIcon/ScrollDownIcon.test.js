import React from 'react';
import 'jest-styled-components';

import ScrollDownIcon from './ScrollDownIcon';
import theme from '../../theme';

describe('ScrollDownIcon', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<ScrollDownIcon theme={theme} />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
