import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import theme from './theme';
import DefaultStyle from './defaultStyle';

describe('defaultStyle', () => {
	const tree = renderer.create(<DefaultStyle theme={theme} />).toJSON();

	it('matches the snapshot', () => {
		expect(tree).toMatchSnapshot();
	});

	it('has correct background', () => {
		expect(tree).toHaveStyleRule('background-color', 'white');
	});

	it('text has correct theme color', () => {
		expect(tree).toHaveStyleRule('color', theme.color.text);
	});

	it('text has correct theme font-family', () => {
		const font = theme.font.main.replace(/\s/g, '');
		expect(tree).toHaveStyleRule('font-family', font);
	});

	it('text has correct font-size', () => {
		expect(tree).toHaveStyleRule('font-size', '0.9em');
	});
});
