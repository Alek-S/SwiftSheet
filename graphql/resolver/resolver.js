const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');
const addDays = require('date-fns/add_days');
const addHours = require('date-fns/add_hours');
const bcrypt = require('bcrypt');

/**
 * @function getSheet - get single sheet based on _id
 * @param {*} _root
 * @param {Object} args - argument object
 * @param {String} args._id - Unique ID of sheet
 * @param {String} args.password - Password for sheet
 */
const getSheet = async (_root, args) => {
	const dbResult = await SwiftSheet.findOne(mongoose.mongo.ObjectId(args._id));

	if (!args.password) {
		// if no password provided
		if (dbResult.hasPassword) {
			throw new Error('Password required for this sheet.');
		}
	} else {
		// if password provided
		const match = await bcrypt.compare(args.password, dbResult.password);
		if (!match) {
			throw new Error('Wrong password provided');
		}
	}
	// all good, return results
	return dbResult;
};

/**
 * @function getSheets - gets all sheets not password protected
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
 * @param {String} args.password - Password for sheet
 */
const createSheet = async (_root, args) => {
	const { password, sheetData } = args;

	// if no expireAt provided, default to three days
	const expireAt = args.expireIn
		? addHours(new Date(), args.expireIn)
		: addDays(new Date(), 3);

	if (password) {
		if (password.length < 6) {
			throw new Error('Password too short. Minimum 6 characters');
		} else if (password.length > 70) {
			throw new Error('Password too long. Maximum 70 characters');
		}
	}

	return await SwiftSheet.create({
		sheetData,
		hasPassword: !!password,
		// if password, remove whitespace characters and get salted hash, else null
		password: password
			? await bcrypt.hash(password.replace(/\s/g, ''), 11)
			: null,
		expireAt,
	});
};

module.exports = {
	getSheet,
	getSheets,
	createSheet,
};
