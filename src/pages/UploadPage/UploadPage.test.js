import React from 'react';
import 'jest-styled-components';

import UploadPage from './UploadPage';
import theme from '../../theme';

describe('UploadPage', () => {
	it('matches the snapshot', () => {
		const tree = shallowWithTheme(<UploadPage />, theme).dive();
		expect(toJson(tree)).toMatchSnapshot();
	});
});
