import React from 'react';
import 'jest-styled-components';

import ViewPage from './ViewPage';
import theme from '../../theme';

describe('ViewPage', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<ViewPage />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
