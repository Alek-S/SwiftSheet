const SwiftSheet = require('../model/swiftsheetDB');
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');

module.exports = function(app) {
	app.get('/api/sanitycheck', (_req, res) => {
		res.status(200).json({ hello: 'world' });
	});

	app.get('/api/sheet/:sheetId', async (req, res) => {
		console.log(req.headers.authorization);
		const authHeader = req.headers.authorization;
		let dbResult;
		try {
			dbResult = await SwiftSheet.findOne(
				mongoose.mongo.ObjectId(req.params.sheetId)
			);

			if (dbResult.hasPassword) {
				if (!authHeader) {
					res.status(403).json({
						error:
							'password protected sheet, provide password as Authorization header',
					});
				} else {
					const match = await bcrypt.compare(authHeader, dbResult.password);
					console.log('match', match);
					if (!match) {
						res.status(403).json({
							error: 'password provided incorrect',
						});
					} else if (match) {
						res.status(200).json({
							data: dbResult.sheetData,
						});
					}
				}
			} else {
				res.status(200).json({
					data: dbResult.sheetData,
				});
			}
		} catch (err) {
			res.status(500).json({ error: 'likely wrong id' });
		}
	});

	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '../../dist/index.html'));
	});
};
