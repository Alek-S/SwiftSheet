import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../src/theme';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

/* == GLOBALS == */
global.shallowWithTheme = (tree, theme) => {
	const context = shallow(<ThemeProvider theme={theme} />)
	  .instance()
	  .getChildContext()
	return shallow(tree, { context })
}

global.shallow = shallow;
global.toJson = toJson;
