import React from 'react';
import Enzyme, { configure, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Header from './Header';
import theme from '../../theme';


Enzyme.configure({ adapter: new Adapter() });


const shallowWithTheme = (tree, theme) => {
	const context = shallow(<ThemeProvider theme={theme} />)
	  .instance()
	  .getChildContext()
	return shallow(tree, { context })
}


describe('Header', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<Header />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('start as large', () => {
		const document = {}
		const wrapper = shallow(<Header />);
		expect(wrapper.find('.large').length).toBe(1);
		expect(wrapper.state().headerSize).toEqual('large');
	});

	it('becomes small on scroll', () => {
		const mockEvent = {};
		const wrapper = shallow(<Header />);
		wrapper.instance().handleScroll(mockEvent, 200);
		expect(wrapper.state().headerSize).toEqual('small');
	});

	it('becomes small on scroll, and large when back to top', () => {
		const mockEvent = {};
		const wrapper = shallow(<Header />);
		wrapper.instance().handleScroll(mockEvent, 200);
		expect(wrapper.state().headerSize).toEqual('small');
		wrapper.instance().handleScroll(mockEvent, 0);
		expect(wrapper.state().headerSize).toEqual('large');
	});
});
