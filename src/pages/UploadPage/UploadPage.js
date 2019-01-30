import React, { Component } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../defaultStyle';
import Filedrop from '../../components/Filedrop/Filedrop';

class UploadPage extends Component {
	constructor() {
		super();
		this.state = { value: 72 };
	}

	handleChange = e => this.setState({ value: e.target.value });

	handleSubmit = e => {
		e.preventDefault();
		console.log('hours until expire: ' + this.state.value);
	};

	render() {
		return (
			<StyledDiv>
				<Filedrop />
				<StyledForm onSubmit={this.handleSubmit} disableSubmit={false}>
					<label>
						Expires In:
						<select value={this.state.value} onChange={this.handleChange}>
							<option value={4}>4 Hours</option>
							<option value={8}>8 Hours</option>
							<option value={24}>1 Day</option>
							<option value={72}>3 Days</option>
							<option value={120}>5 Days</option>
						</select>
					</label>
					<input type="submit" value="Upload File" disabled={false} />
				</StyledForm>
			</StyledDiv>
		);
	}
}

const StyledDiv = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	padding-top: 7rem;
	height: calc(100vh - 100px);
`;

const StyledForm = styled.form`
	display: block;
	width: 90%;
	margin: auto;
	text-align: center;
	margin-top: 2rem;

	label {
		font-size: 1.1rem;
	}
	select {
		font-family: ${props => props.theme.font.main};
		font-size: 1rem;
		background-color: white;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		border: solid 1px ${props => props.theme.color.border};
	}

	input {
		cursor: ${props => (props.disableSubmit ? 'no-drop' : 'pointer')};
		color: white;
		display: block;
		margin: auto;
		margin-top: 4rem;
		font-family: ${props => props.theme.font.main};
		font-weight: 400;
		font-size: 1.3rem;
		border: none;
		border-radius: 20px;
		padding: 7px 25px;
		background: ${props =>
			props.disableSubmit
				? props.theme.color.border
				: props.theme.gradient.red};

		&:hover {
			background: ${props =>
				props.disableSubmit
					? props.theme.color.border
					: props.theme.gradient.lightRed};
		}
	}
`;

export default UploadPage;
