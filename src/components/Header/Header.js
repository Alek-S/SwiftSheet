import React from 'react';
import styled from 'styled-components';


export default class Header extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			headerSize: 'large'
		}
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	
	handleScroll = (scrollTop = document.documentElement.scrollTop) => {
		if(scrollTop > 100 && this.state.headerSize !== 'small'){
			this.setState({
				headerSize: 'small'
			});
		}else if(scrollTop <= 100 && this.state.headerSize !== 'large'){
			this.setState({
				headerSize: 'large'
			});
		}
	}

	render(){
		const {headerSize} = this.state;

		return (
			<Nav className={headerSize}>
				<img src='./assets/images/logo.svg' alt='logo' /> <h1>SwiftSheet</h1>
			</Nav>
		)
	}
}


const Nav = styled.nav`
	position: fixed;
	width: 100%;
	border-bottom: solid 1px ${props => props.theme.color.border};
	padding: .8rem;
	transition: all 0.3s;

	& img, h1{
		display:inline;
		transition: all 0.3s;
	}
	& img{
		height: 50px;
	}
	& h1{
		font-family: ${props => props.theme.font.header};
		font-size: 2.5rem;
		letter-spacing: 4px;
		margin-left: .5rem;
		position: relative;
		top: -.7rem;
	}

	&.small {
		padding: .4rem;
		padding-left: .8rem;
		padding-bottom: .15rem;
		
		img{
			height: 25px;
		}
		h1{
			font-size: 1.5rem;
			top: -.3rem;
		}
	}
`