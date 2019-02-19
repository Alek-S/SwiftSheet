import React from 'react';
import 'jest-styled-components';

import UploadPage from './UploadPage';
import theme from '../../theme';

describe('UploadPage', () => {
	//TODO: test using apollo mockprovider
	it.skip('matches the snapshot', () => {
		const tree = mountWithTheme(<UploadPage />, theme);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
