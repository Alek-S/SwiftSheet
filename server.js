const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const morgan = require('morgan');
const express_graphql = require('express-graphql');
const schema = require('./backend/graphql/schema/schema');
const depthLimit = require('graphql-depth-limit');
const rateLimit = require('express-rate-limit');

//==Express Setup==
const app = express();
app.set('port', process.env.PORT || 5000);

//==Mode==
if (process.env.NODE_ENV === 'production') {
	console.log(`Server mode [${chalk.red(process.env.NODE_ENV)}]`);
} else {
	console.log(`Server mode [${chalk.cyan('dev')}]`);
}

//===Morgan Logger Middleware===
if (process.env.NODE_ENV === 'production') {
	app.use(
		morgan(
			':date[web] :remote-addr -- :method :url :status - :response-time ms'
		)
	);
} else {
	app.use(
		morgan(
			`${chalk.blue(':method')} :url  ${chalk.grey(
				':status | :response-time ms'
			)}`
		)
	);
}

//===Rate Limit===
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 25,
});
app.use('/api/', apiLimiter);

//===Parsing===
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.text());

//===Graphql===
app.use(
	'/graphql',
	express_graphql({
		schema: schema,
		graphiql: !process.env.NODE_ENV,
		validationRules: [depthLimit(2)],
	})
);

//===Static Files, CSS,Images,Fonts===
app.use(express.static('dist'));

//===Trust First Proxy===
app.set('trust proxy', 1);

//===MongoDB Connection with Mongoose==
// mongoose.Promise = global.Promise; //use standard Promise instead of Mongo's promise library
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/swiftsheet',
	{ useCreateIndex: true, useNewUrlParser: true }
);
const db = mongoose.connection;

db.on('error', error => {
	// Show any mongoose errors
	console.error(`${chalk.red('Mongoose Error: ')} ${error}`);
});

//===Routes===
require('./backend/controller/routes.js')(app);

//==Start Server==
const server = app.listen(app.get('port'), () => {
	if (process.env.PORT) {
		console.log(`Running on Port: ${app.get('port')}\n`);
	} else {
		const location = `http://localhost:${app.get('port')}`;
		console.log(`🙌 Running at: ${chalk.cyan(location)}`);
		console.log(`GraphQL: ${chalk.cyan(location + '/graphql')}`);
	}
});

module.exports = server; //for testing
