import React from 'react';
import 'jest-styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Header, { Nav, StyledNavLink, Tagline } from './Header';
import theme from '../../theme';

// simulate window scroll
function fireScroll(height) {
	document.documentElement.scrollTop = height;
	window.dispatchEvent(new Event('scroll'));
}

describe('Header', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(
			<Router>
				<Header />
			</Router>,
			theme
		);
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('start as large', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find('.large').length).toBeGreaterThan(0);
	});
});

describe('Nav', () => {
	const tree = renderer.create(<Nav theme={theme} />).toJSON();

	test('matches the snapshot', () => {
		expect(tree).toMatchSnapshot();
	});
});

describe('StyledNavLink', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(
			<Router>
				<StyledNavLink />
			</Router>,
			theme
		).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});

describe('Tagline', () => {
	const tree = renderer.create(<Tagline theme={theme} />).toJSON();

	test('matches the snapshot', () => {
		expect(tree).toMatchSnapshot();
	});
});
