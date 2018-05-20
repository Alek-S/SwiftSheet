import React from 'react';
import Enzyme, { configure, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import App from './App.js';
import theme from '../theme';

Enzyme.configure({ adapter: new Adapter() });

const shallowWithTheme = (tree, theme) => {
	const context = shallow(<ThemeProvider theme={theme} />)
		.instance()
		.getChildContext();
	return shallow(tree, { context });
};

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
