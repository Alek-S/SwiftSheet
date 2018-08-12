const SwiftSheet = require('../model/swiftsheetDB');
const chalk = require('chalk');

module.exports = function(app) {
	app.get('/api/sanitycheck', (_req, res) => {
		res.status(200).json({ hello: 'world' });
	});

	app.post('/api/sanitycheck', (req, res) => {
		const { message } = req.body;

		if (message) {
			SwiftSheet.create({
				message,
				active: true,
			})
				.then(() => {
					res.status(200).json({
						success: true,
						message,
					});
				})
				.catch(err => {
					console.log(chalk.red(err));
					res.status(500).json({
						success: false,
						error: err,
					});
				});
		} else {
			res.status(400).json({
				success: false,
				error: 'No message',
			});
		}
	});
};
