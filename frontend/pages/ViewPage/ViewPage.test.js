import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import ViewPage, { StyledDiv } from './ViewPage';
import theme from '../../theme';

describe('ViewPage', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<ViewPage theme={theme} />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('StyledDiv matches the snapshot', () => {
		const tree = renderer.create(<StyledDiv theme={theme} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
