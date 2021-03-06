const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');
const addDays = require('date-fns/addDays');
const addHours = require('date-fns/addHours');
const bcrypt = require('bcrypt');
const errorMessage = require('../../../shared/enums/errorMessage');
const pako = require('pako');

/**
 * @function getSheet - get single sheet based on _id
 * @param {*} _root
 * @param {Object} args - argument object
 * @param {String} args._id - Unique ID of sheet
 * @param {String} args.password - Password for sheet
 */
const getSheet = async (_root, args) => {
	const dbResult = await SwiftSheet.findOne({ _id: args._id });

	if (!args.password) {
		// if no password provided
		if (dbResult.hasPassword) {
			throw new Error(errorMessage.noPassword);
		}
	} else {
		// if wrong password provided
		const match = await bcrypt.compare(args.password, dbResult.password);
		if (!match) {
			throw new Error(errorMessage.wrongPassword);
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
	//convert base64 to binary string
	const binaryString = Buffer.from(sheetData, 'base64');
	//zlib inflate binary string and convert to json
	const restoredSheetData = JSON.parse(
		pako.inflate(binaryString, { to: 'string' })
	);

	// if no expireAt provided, default to three days
	const expireAt = args.expireIn
		? addHours(new Date(), args.expireIn)
		: addDays(new Date(), 3);

	if (password) {
		if (password.length < 6) {
			throw new Error(errorMessage.shortPassword);
		} else if (password.length > 70) {
			throw new Error(errorMessage.longPassword);
		}
	}

	return await SwiftSheet.create({
		sheetData: restoredSheetData,
		hasPassword: !!password,
		// if password, remove whitespace characters and get salted hash, else null
		password: password
			? await bcrypt.hash(password.replace(/\s/g, ''), 8)
			: null,
		expireAt,
	});
};

module.exports = {
	getSheet,
	getSheets,
	createSheet,
};
