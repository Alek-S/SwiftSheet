const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');

// Get single sheet based on _id
const getSheet = async args => {
	return await SwiftSheet.findOne(mongoose.mongo.ObjectId(args._id));
};

// Get all sheets
const getSheets = async () => {
	return await SwiftSheet.find({});
};

// create new sheet with a given message
const createSheet = async args => {
	return await SwiftSheet.create({
		sheetData: args.sheetData,
	});
};

const root = {
	sheet: getSheet,
	sheets: getSheets,
	createSheet,
};

module.exports = root;
