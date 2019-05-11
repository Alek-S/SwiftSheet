import React from 'react';
import Filedrop from './Filedrop';
import theme from '../../theme';

describe('Filedrop', () => {
	test('matches the snapshot', () => {
		const tree = mountWithTheme(<Filedrop />, theme);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
