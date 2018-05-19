import React from 'react';
import Enzyme, { configure, shallow } from 'enzyme';
import App from './App.js';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
	it('matches the snapshot', () => {
		const tree = shallow(<App />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('contains a Header', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Header').length).toBe(1);
	});
});
