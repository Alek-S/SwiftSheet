import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import defaultStyle from '../../defaultStyle';
import format from 'date-fns/format';
import Table from '../../components/Table/Table';

const GET_SHEET = gql`
	query GET_SHEET($sheetId: ID!) {
		sheet(_id: $sheetId) {
			sheetData
			expireAt
		}
	}
`;

const SheetPage = ({ match }) => {
	const { sheetId } = match.params;

	return (
		<Query query={GET_SHEET} variables={{ sheetId }}>
			{({ loading, error, data }) => {
				if (loading) return <StyledDiv>Loading...</StyledDiv>;
				if (error) return <StyledDiv>Error! {error.message}</StyledDiv>;

				const { sheetData, expireAt } = data.sheet;
				return (
					<StyledDiv>
						<ExpireDiv>
							Sheet Expires on:{' '}
							{format(expireAt, 'MMM DD, YYYY  @  H:mm aa  (Z [GMT])')}
						</ExpireDiv>
						<Table data={sheetData} />
					</StyledDiv>
				);
			}}
		</Query>
	);
};

const StyledDiv = styled(defaultStyle)`
	padding-top: 7rem;
`;

const ExpireDiv = styled.div`
	text-align: center;
	color: ${props => props.theme.color.lightText};
`;

export default SheetPage;
