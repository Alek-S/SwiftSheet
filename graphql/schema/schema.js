const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
} = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');

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

// TODO: break out resolver logic to seperate file
const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'The root query type.',
	fields: {
		sheets: {
			type: new GraphQLList(sheetType),
			resolve: async () => {
				return await SwiftSheet.find({});
			},
		},
		sheet: {
			args: {
				_id: {
					description: 'Unique ID of sheet',
					type: GraphQLID,
				},
			},
			type: sheetType,
			resolve: async (_root, { _id }) => {
				return await SwiftSheet.findOne(mongoose.mongo.ObjectId(_id));
			},
		},
	},
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root mutation type',
	fields: {
		createSheet: {
			args: {
				sheetData: {
					description: 'Spreadsheet data as JSON',
					type: GraphQLJSON,
				},
			},
			type: sheetType,
			resolve: async (_root, args) => {
				return await SwiftSheet.create({
					sheetData: args.sheetData,
				});
			},
		},
	},
});

const schema = new GraphQLSchema({
	query: queryType,
	mutation,
});

module.exports = schema;
