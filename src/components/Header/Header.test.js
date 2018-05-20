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
});
