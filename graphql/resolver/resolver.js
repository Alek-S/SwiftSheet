const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');
const { addDays } = require('date-fns');
const bcrypt = require('bcrypt');

/**
 * @function getSheet - get single sheet based on _id
 * @param {*} _root
 * @param {Object} args - argument object
 * @param {String} args._id - Unique ID of sheet
 */
const getSheet = async (_root, { _id, password }) => {
	if (!password) {
		return await SwiftSheet.findOne(
			{ _id: mongoose.mongo.ObjectId(_id) },
			{ password: 0 }
		);
	} else {
		// compare hashed password and then return
	}
};

/**
 * @function getSheets - get all sheets
 */
const getSheets = async () => {
	return await SwiftSheet.find({ hasPassword: false }, { password: 0 });
};

/**
 * @function createSheet - create new sheet with given sheetData JSON
 * @param {*} _root
 * @param {Object} args - argument object
 * @param {Object} args.sheetData - spreadsheet data as JSON
 * @param {Date} args.expireAt - Datetime record should be deleted at
 */
const createSheet = async (_root, args) => {
	// if no expireAt provided, default to three days
	const expireAt = args.expireAt || addDays(new Date(), 3);
	const passwordText = args.password || null;

	if (passwordText) {
		if (passwordText.length < 6) {
			throw new Error('Password too short. Minimum 6 characters');
		} else if (passwordText.length > 70) {
			throw new Error('Password too long. Maximum 6 characters');
		}
	}

	return await SwiftSheet.create({
		sheetData: args.sheetData,
		hasPassword: !!passwordText,
		password: passwordText ? await bcrypt.hash(passwordText, 11) : null,
		expireAt,
	});
};

module.exports = {
	getSheet,
	getSheets,
	createSheet,
};
