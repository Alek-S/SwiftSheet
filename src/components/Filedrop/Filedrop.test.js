import React from 'react';
import Filedrop from './Filedrop';
import theme from '../../theme';


describe('Filedrop', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<Filedrop />, theme);
		expect(toJson(tree)).toMatchSnapshot();
	});
});