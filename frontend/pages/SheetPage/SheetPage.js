import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import defaultStyle from '../../defaultStyle';
import format from 'date-fns/format';
import Table from '../../components/SwiftTable/Table';
import { PasswordPrompt } from '../../components/PasswordPrompt/PasswordPrompt';
import { RestExample } from '../../components/RestExample/RestExample';
import { GQLExample } from '../../components/GQLExample/GQLExample';
import * as errorMessage from '../../../shared/enums/errorMessage';
import { addToHistory, removeFromHistory } from '../../utils/history';
import { Link } from 'react-router-dom';

export const GET_SHEET = gql`
	query GET_SHEET($sheetId: ID!, $password: String) {
		sheet(_id: $sheetId, password: $password) {
			sheetData
			expireAt
		}
	}
`;

const SheetPage = ({ match }) => {
	const { sheetId } = match.params;
	const [password, setPassword] = useState('');

	return (
		<Query query={GET_SHEET} variables={{ sheetId, password }}>
			{({ loading, error, data }) => {
				if (loading) return <StyledDiv>Loading...</StyledDiv>;

				// if password not provided
				if (
					error &&
					(error.message.includes(errorMessage.noPassword) ||
						error.message.includes(errorMessage.wrongPassword))
				) {
					const wrongPassword = error.message.includes(
						errorMessage.wrongPassword
					);
					// then prompt user for password before proceeding
					return (
						<PasswordPrompt
							setPassword={setPassword}
							wrongPassword={wrongPassword}
						/>
					);
				}

				if (error) {
					removeFromHistory(sheetId);
					return (
						<ExpiredNotice>
							<section>
								<p className="errorMessage">
									Sorry, looks like this sheet may have expired.
								</p>
								<p>
									Maybe <Link to="/upload">Upload</Link> a new one, or check
									recently <Link to="/view">viewed</Link>.
								</p>
							</section>
						</ExpiredNotice>
					);
				}

				const { sheetData, expireAt } = data.sheet;
				addToHistory(sheetId);
				return (
					<WrapperDiv>
						<RestExample host={window.location.origin} id={sheetId} />
						<GQLExample host={window.location.origin} id={sheetId} />
						<StyledDiv>
							<ExpireDiv>
								Sheet Expires on:{' '}
								{format(expireAt, 'MMM DD, YYYY  @  h:mm aa  (Z [GMT])')}
							</ExpireDiv>
							<Table data={sheetData} />
						</StyledDiv>
					</WrapperDiv>
				);
			}}
		</Query>
	);
};

const WrapperDiv = styled(defaultStyle)`
	padding-top: 6rem;
	background-color: ${props => props.theme.color.background};
	margin-top: 0rem;
	padding-bottom: 2rem;
	width: 100%;
`;

const StyledDiv = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	padding-bottom: 2rem;
	margin-bottom: 0px;
	width: 100%;
	height: calc(100vh - 140px);
`;

const ExpireDiv = styled.div`
	text-align: center;
	color: ${props => props.theme.color.lightText};
	margin-top: 2rem;
`;

const ExpiredNotice = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	height: calc(100vh - 55px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	section {
		margin-bottom: 1rem;
		background-color: white;
		padding: 2.5rem 4rem;
		border-radius: 8px;
		box-shadow: ${props => props.theme.boxShadowLight};
	}
	p {
		margin: 1rem;
	}

	a {
		color: ${props => props.theme.color.blue};
	}

	@media (max-width: 500px) {
		width: 95%;
		margin: auto;
		section {
			padding: 2rem 1rem;
		}
		p {
			margin: 2rem 0.1rem;
		}
	}
`;

export default SheetPage;
