import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

/* == GLOBALS == */
global.shallowWithTheme = (tree, theme) => {
	const context = shallow(<ThemeProvider theme={theme} />)
		.instance()
		.getChildContext();
	return shallow(tree, { context });
};

global.mountWithTheme = (tree, theme) => {
	const context = shallow(<ThemeProvider theme={theme} />).instance();

	return mount(tree, {
		context,
		childContextTypes: ThemeProvider.childContextTypes,
	});
};

global.shallow = shallow;
global.mount = mount;
global.toJson = toJson;
