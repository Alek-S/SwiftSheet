const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const SwiftSheetSchema = new Schema({
	message: String,
	active: Boolean,
});


const SwiftSheet = mongoose.model('SwiftSheetDB', SwiftSheetSchema);
module.exports = SwiftSheet;