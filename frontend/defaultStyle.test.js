import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import theme from './theme';
import DefaultStyle, { ApiCard, Policy } from './defaultStyle';

describe('defaultStyle', () => {
	const tree = renderer.create(<DefaultStyle theme={theme} />);

	test('matches the snapshot', () => {
		expect(tree).toMatchSnapshot();
	});

	// test('has correct background', () => {
	// 	expect(tree).toHaveStyleRule('background-color', 'white');
	// });

	// test('text has correct theme color', () => {
	// 	expect(tree).toHaveStyleRule('color', theme.color.text);
	// });

	// test('text has correct theme font-family', () => {
	// 	const font = theme.font.main.replace(/\s/g, '');
	// 	expect(tree).toHaveStyleRule('font-family', font);
	// });

	// test('text has correct font-size', () => {
	// 	expect(tree).toHaveStyleRule('font-size', '0.9em');
	// });
});

describe('ApiCard', () => {
	const tree = renderer.create(<ApiCard theme={theme} />).toJSON();

	test('matches the snapshot', () => {
		expect(tree).toMatchSnapshot();
	});
});

describe('Policy', () => {
	const tree = renderer.create(<Policy theme={theme} />).toJSON();

	test('matches the snapshot', () => {
		expect(tree).toMatchSnapshot();
	});
});
