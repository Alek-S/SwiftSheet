import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import FrontPage from './FrontPage';
import theme from '../../theme';

describe('FrontPage', () => {
	test('matches the snapshot', () => {
		const tree = mountWithTheme(<FrontPage />, theme);
		expect(tree).toMatchSnapshot();
	});
});
