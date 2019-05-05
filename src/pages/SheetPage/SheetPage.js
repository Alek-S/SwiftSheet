import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import defaultStyle from '../../defaultStyle';
import format from 'date-fns/format';
import HeadlessTable from '../../components/SwiftTable/Table';
import { PasswordPrompt } from '../../components/PasswordPrompt/PasswordPrompt';
import * as errorMessage from '../../../utils/enums/errorMessage';

const GET_SHEET = gql`
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

				if (
					error &&
					(error.message.includes(errorMessage.noPassword) ||
						error.message.includes(errorMessage.wrongPassword))
				) {
					const wrongPassword = error.message.includes(
						errorMessage.wrongPassword
					);

					return (
						<PasswordPrompt
							password={password}
							setPassword={setPassword}
							wrongPassword={wrongPassword}
						/>
					);
				}

				if (error) return <StyledDiv>Error! {error.message}</StyledDiv>;

				const { sheetData, expireAt } = data.sheet;
				return (
					<StyledDiv>
						<ExpireDiv>
							Sheet Expires on:{' '}
							{format(expireAt, 'MMM DD, YYYY  @  h:mm aa  (Z [GMT])')}
						</ExpireDiv>
						<HeadlessTable data={sheetData} />
					</StyledDiv>
				);
			}}
		</Query>
	);
};

const StyledDiv = styled(defaultStyle)`
	background-color: ${props => props.theme.color.background};
	padding-top: 7rem;
	height: calc(100vh - 100px);
`;

const ExpireDiv = styled.div`
	text-align: center;
	color: ${props => props.theme.color.lightText};
`;

export default SheetPage;
