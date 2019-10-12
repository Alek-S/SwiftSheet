import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { LocalStorageMock } from '@react-mock/localstorage';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';

import RecentlyViewed, { StyledCard } from './RecentlyViewed';
import theme from '../../theme';

describe('RecentlyViewed', () => {
	test('matches the snapshot', () => {
		const tree = shallowWithTheme(<RecentlyViewed />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('StyledCard matches the snapshot', () => {
		const tree = renderer.create(<StyledCard theme={theme} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('it should show nothing viewed recently', () => {
		const mockHistory = [];
		const ui = render(
			<ThemeProvider theme={theme}>
				<LocalStorageMock history={mockHistory}>
					<RecentlyViewed />
				</LocalStorageMock>
			</ThemeProvider>
		);

		expect(ui.getByText('No recently viewed items')).toBeInTheDocument();
	});
});
