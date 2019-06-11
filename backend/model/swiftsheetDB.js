const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

// Create schema
const SwiftSheetSchema = new Schema(
	{
		_id: {
			type: String,
			default: shortid.generate,
		},
		sheetData: {
			type: Object,
			required: true,
		},
		hasPassword: {
			type: Boolean,
			default: false,
			required: true,
		},
		password: {
			type: String,
		},
		expireAt: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

// Sheet expires and deleter zero seconds after reaching expireAt timedate
SwiftSheetSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const SwiftSheet = mongoose.model('SwiftSheetDB', SwiftSheetSchema);
module.exports = SwiftSheet;
