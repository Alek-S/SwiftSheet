import React from 'react';
import 'jest-styled-components';

import FrontPage from './FrontPage';
import theme from '../../theme';

describe('FrontPage', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<FrontPage />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
