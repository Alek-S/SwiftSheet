import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import wait from 'waait';
import 'jest-styled-components';

import SheetPage, { GET_SHEET, WrapperDiv, ExpireDiv } from './SheetPage';
import theme from '../../theme';

const match = {
	params: 'testId',
};

const mocks = [
	{
		request: {
			query: GET_SHEET,
			variables: {
				sheetId: '5ccf986734447267b45010b3',
				password: 'mockPassword',
			},
		},
		result: {
			data: {
				sheet: {
					expireAt: '2019-05-09T02:13:59.178Z',
					sheetData: [
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
					],
				},
			},
		},
	},
];

const errorMocks = [
	{
		request: {
			query: GET_SHEET,
			variables: {
				sheetId: '55555555555555555',
			},
		},
		result: {
			errors: [
				{
					message: 'Password required for this sheet',
					locations: [
						{
							line: 2,
							column: 3,
						},
					],
					path: ['sheet'],
				},
			],
			data: {
				sheet: null,
			},
		},
	},
];

describe('<SheetPage />', () => {
	test('renders', () => {
		renderer.create(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Router>
					<ThemeProvider theme={theme}>
						<SheetPage
							match={{
								params: {
									sheetId: '5ccf986734447267b45010b3',
								},
							}}
						/>
					</ThemeProvider>
				</Router>
			</MockedProvider>
		);
	});

	test('matches the snapshot', () => {
		const component = renderer.create(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Router>
					<ThemeProvider theme={theme}>
						<SheetPage
							match={{
								params: {
									sheetId: '5ccf986734447267b45010b3',
								},
							}}
						/>
					</ThemeProvider>
				</Router>
			</MockedProvider>
		);
		expect(toJson(component)).toMatchSnapshot();
	});

	test('WrapperDiv matches the snapshot', () => {
		const tree = renderer.create(<WrapperDiv theme={theme} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('ExpireDiv matches the snapshot', () => {
		const tree = renderer.create(<ExpireDiv theme={theme} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('should render loading state initially', () => {
		const component = renderer.create(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Router>
					<ThemeProvider theme={theme}>
						<SheetPage
							match={{
								params: {
									sheetId: '5ccf986734447267b45010b3',
								},
							}}
						/>
					</ThemeProvider>
				</Router>
			</MockedProvider>
		);

		const tree = component.toJSON();
		expect(tree.children).toContain('Loading...');
	});

	//TODO:
	test.skip('should render error', async () => {
		const wrapper = mount(
			<MockedProvider mocks={errorMocks} addTypename={false}>
				<Router>
					<ThemeProvider theme={theme}>
						<SheetPage
							match={{
								params: {
									sheetId: '55555555555555555',
								},
							}}
							// pw='mockPassword'
						/>
					</ThemeProvider>
				</Router>
			</MockedProvider>
		);

		await watest(0);
		wrapper.update();

		const message = wrapper.find('p.errorMessage');
		expect(message.text()).toContain(
			'Sorry, looks like this sheet may have expired.'
		);
	});
});
