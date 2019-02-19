import React from 'react';
import 'jest-styled-components';

import SheetPage from './SheetPage';
import theme from '../../theme';

const match = {
	params: 'testId',
};

describe('<SheetPage />', () => {
	// TODO: test using mock provider for query
	it.skip('matches the snapshot', () => {
		const tree = shallowWithTheme(<SheetPage match={match} />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
