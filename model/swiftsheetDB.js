const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const SwiftSheetSchema = new Schema({
	sheetData: Object,
	active: { type: Boolean, default: true },
	created: { type: Date, default: Date.now },
});

const SwiftSheet = mongoose.model('SwiftSheetDB', SwiftSheetSchema);
module.exports = SwiftSheet;
