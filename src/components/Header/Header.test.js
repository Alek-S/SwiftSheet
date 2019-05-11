import React from 'react';
import 'jest-styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import theme from '../../theme';

// simulate window scroll
function fireScroll(height) {
	document.documentElement.scrollTop = height;
	window.dispatchEvent(new Event('scroll'));
}

describe('Header', () => {
	test('matches the snapshot', () => {
		const tree = mountWithTheme(
			<Router>
				<Header />
			</Router>,
			theme
		);
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('start as large', () => {
		const document = {};
		const wrapper = shallow(<Header />);
		expect(wrapper.find('.large').length).toBeGreaterThan(0);
	});

	// 	test('becomes small on scroll, and large when back to top', () => {
	// 		const mockEvent = {};
	// 		const wrapper = shallow(<Header />);
	// 		wrapper.instance().handleScroll(mockEvent, 200);
	// 		expect(wrapper.state().headerSize).toEqual('small');
	// 		wrapper.instance().handleScroll(mockEvent, 0);
	// 		expect(wrapper.state().headerSize).toEqual('large');
	// 	});
});
