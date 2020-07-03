import React from 'react';
import 'jest-styled-components';

import { RestExample } from './RestExample';
import theme from '../../theme';

describe('RestExample', () => {
	test('matches the snapshot', () => {
		const tree = shallow(
			<RestExample host="mockHost.com" id="42" theme={theme} />
		);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
