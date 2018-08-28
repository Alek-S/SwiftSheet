const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        sheet(_id: String): Sheet
        sheets: [Sheet]
	},

	type Mutation {
        createSheet(message: String!): Sheet
	}

    type Sheet {
        _id: String
        message: String
    }
`);

module.exports = schema;
