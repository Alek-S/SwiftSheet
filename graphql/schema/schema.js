const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
	},

	type Mutation {
		updateCourseTopic(id: Int!, topic: String!): Course
	}

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

module.exports = schema;
