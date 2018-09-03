const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');
const { addDays } = require('date-fns');

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
	// throw new Error('Unavailable in your country.');
	return await SwiftSheet.find({});
};

/**
 * @function createSheet - create new sheet with given sheetData JSON
 * @param {*} _root
 * @param {Object} args - argument object
 * @param {Object} args.sheetData - spreadsheet data as JSON
 * @param {Date} args.expireAt - Datetime record should be deleted at
 */
const createSheet = async (_root, args) => {
	// if provided expireAt date use it, else set expire to be in three days
	const expireAt = args.expireAt || addDays(new Date(), 3);
	console.log(expireAt);
	return await SwiftSheet.create({
		sheetData: args.sheetData,
		expireAt,
	});
};

module.exports = {
	getSheet,
	getSheets,
	createSheet,
};
