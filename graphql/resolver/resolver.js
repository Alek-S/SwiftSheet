const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');

/**
 * @function getSheet - get single sheet based on _id
 * @param {*} _root
 * @param {Object} args - argument object
 * @param {String} args._id - Unique ID of sheet
 */
const getSheet = async (_root, { _id }) => {
	return await SwiftSheet.findOne(mongoose.mongo.ObjectId(_id));
};

/**
 * @function getSheets - get all sheets
 */
const getSheets = async () => {
	return await SwiftSheet.find({});
};

/**
 * @function createSheet - create new sheet with given sheetData JSON
 * @param {*} _root
 * @param {Object} args - argument object
 * @param {Object} args.sheetData - spreadsheet data as JSON
 */
const createSheet = async (_root, args) => {
	return await SwiftSheet.create({
		sheetData: args.sheetData,
	});
};

module.exports = {
	getSheet,
	getSheets,
	createSheet,
};
