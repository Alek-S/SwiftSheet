import React from 'react';
import 'jest-styled-components';

import App from './App.js';
import theme from '../theme';

describe('App', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<App theme={theme} />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('contains a Header', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Header').length).toBe(1);
	});

	test('contains a Footer', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Footer').length).toBe(1);
	});
});
