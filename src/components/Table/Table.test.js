import React from 'react';
import 'jest-styled-components';

import Table from './Table';
import theme from '../../theme';

const match = {
	params: 'testId',
};

describe('<Table />', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<Table />, theme);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
