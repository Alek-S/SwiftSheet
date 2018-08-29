const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const { getSheet, getSheets, createSheet } = require('../resolver/resolver');

//===TYPES===
const sheetType = new GraphQLObjectType({
	name: 'Sheet',
	description: 'A single Swiftsheet object',
	fields: {
		_id: {
			type: GraphQLID,
			description: 'Unique ID',
		},
		sheetData: {
			type: GraphQLJSON,
			description: 'Spreadsheet data as JSON',
		},
		active: {
			type: GraphQLBoolean,
			description: 'Is sheet currently active',
		},
		created: {
			type: GraphQLString,
			description: 'Date created on',
		},
	},
});

//===QUERIES===
const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'The root query type.',
	fields: {
		sheets: {
			type: new GraphQLList(sheetType),
			resolve: getSheets,
		},
		sheet: {
			args: {
				_id: {
					description: 'Unique ID of sheet',
					type: new GraphQLNonNull(GraphQLID),
				},
			},
			type: sheetType,
			resolve: (root, args) => getSheet(root, args),
		},
	},
});

//===MUTATIONS===
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root mutation type',
	fields: {
		createSheet: {
			args: {
				sheetData: {
					description: 'Spreadsheet data as JSON',
					type: new GraphQLNonNull(GraphQLJSON),
				},
			},
			type: sheetType,
			resolve: (root, args) => createSheet(root, args),
		},
	},
});

//===SCHEMA===
const schema = new GraphQLSchema({
	query: queryType,
	mutation,
});

module.exports = schema;
