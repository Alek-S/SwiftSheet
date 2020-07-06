import React from 'react';
import 'jest-styled-components';

import { GQLExample } from './GQLExample';
import theme from '../../theme';

describe('GQLExample', () => {
	test('matches the snapshot', () => {
		const tree = shallow(
			<GQLExample host="mockHost.com" id="42" theme={theme} />
		);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
