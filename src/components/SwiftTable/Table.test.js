import React from 'react';
import 'jest-styled-components';

import HeadlessTable from './Table';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const match = {
	params: 'testId',
};
const data = [
	{
		'First Name': 'John',
		'Last Name': 'Doe',
		Address: '120 jefferson st.',
		City: 'Riverside',
		State: ' NJ',
		Zip: '8075',
	},
	{
		'First Name': 'Jack',
		'Last Name': 'McGinnis',
		Address: '220 hobo Av.',
		City: 'Phila',
		State: ' PA',
		Zip: '9119',
	},
	{
		'First Name': 'John "Da Man"',
		'Last Name': 'Repici',
		Address: '120 Jefferson St.',
		City: 'Riverside',
		State: ' NJ',
		Zip: '8075',
	},
	{
		'First Name': 'Stephen',
		'Last Name': 'Tyler',
		Address: '7452 Terrace "At the Plaza" road',
		City: 'SomeTown',
		State: 'SD',
		Zip: '91234',
	},
	{
		'First Name': '',
		'Last Name': 'Blankman',
		Address: '',
		City: 'SomeTown',
		State: ' SD',
		Zip: '298',
	},
	{
		'First Name': 'Joan "the bone", Anne',
		'Last Name': 'Jet',
		Address: '9th, at Terrace plc',
		City: 'Desert City',
		State: 'CO',
		Zip: '123',
	},
];

describe('<HeadlessTable />', () => {
	it('matches the snapshot', () => {
		const tree = mount(
			<ThemeProvider theme={theme}>
				<HeadlessTable data={data} />
			</ThemeProvider>
		);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
