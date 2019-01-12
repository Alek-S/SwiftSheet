import React from 'react';
import 'jest-styled-components';

import App from './App.js';
import theme from '../theme';

describe('App', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<App />, theme);
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('contains a Header', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Header').length).toBe(1);
	});

	it('contains a Footer', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Footer').length).toBe(1);
	});
});
