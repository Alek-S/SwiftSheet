import React from 'react';
import Enzyme, { configure, shallow } from 'enzyme';
import Header from './Header';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
	it('matches the snapshot', () => {
		const tree = shallow(<Header />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
