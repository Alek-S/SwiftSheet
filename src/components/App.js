import React from 'react';
import Header from './Header/Header';
import styled from 'styled-components';

export default class App extends React.Component {
	render() {
		return (
			<Body onScroll={this.handleScroll}>
				<Header />
			</Body>
		);
	}
}

const Body = styled.div`
	height: 2000px;
`;
