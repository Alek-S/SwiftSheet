const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
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
		hasPassword: {
			type: GraphQLBoolean,
			description: 'Is current sheet password protected',
		},
		expireAt: {
			type: GraphQLDateTime,
			description: 'Date Time Sheet will expire at',
		},
		createdAt: {
			type: GraphQLDateTime,
			description: 'DateTime created on',
		},
		updatedAt: {
			type: GraphQLDateTime,
			description: 'DateTime created on',
		},
	},
});

//===QUERIES===
const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'The root query type.',
	fields: {
		sheets: {
			description: 'Return all sheets, excluding password protected',
			type: new GraphQLList(sheetType),
			resolve: getSheets,
		},
		sheet: {
			description: "Return specific sheet, based un sheet's ID",
			args: {
				_id: {
					description: 'Unique ID of sheet',
					type: new GraphQLNonNull(GraphQLID),
				},
				password: {
					description: 'sheet password',
					type: GraphQLString,
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
					description: 'Spreadsheet data as Zlib Base64 string',
					type: new GraphQLNonNull(GraphQLString),
				},
				expireIn: {
					description: 'How many hours to expire in',
					type: GraphQLInt,
				},
				password: {
					description: 'Optional password for requesting sheet',
					type: GraphQLString,
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
