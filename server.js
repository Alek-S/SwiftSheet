const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
const morgan = require('morgan');
const express_graphql = require('express-graphql');
const schema = require('./backend/graphql/schema/schema');
const depthLimit = require('graphql-depth-limit');
const rateLimit = require('express-rate-limit');
const Sentry = require('@sentry/node');
const helmet = require('helmet');

//==Express Setup==
const app = express();
app.set('port', process.env.PORT || 5000);

//==Mode==
if (process.env.NODE_ENV === 'production') {
	console.log(`Server mode [${chalk.red(process.env.NODE_ENV)}]`);
} else {
	console.log(`Server mode [${chalk.cyan('dev')}]`);
}

//==Safer Headers==
app.use(helmet());

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

//===Trust First Proxy===
app.set('trust proxy', 1);

//===Rate Limit===
const apiLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100,
});
app.use('/api/', apiLimiter);

//===Parsing===
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.text());

//===Graphql===
app.use(
	'/graphql',
	apiLimiter,
	express_graphql({
		schema: schema,
		graphiql:
			process.env.NODE_ENV && process.env.NODE_ENV === 'production'
				? false
				: true,
		validationRules: [depthLimit(2)],
	})
);

//===Static Files, CSS,Images,Fonts===
app.use(express.static('dist'));

//===MongoDB Connection with Mongoose==
const connect = () => {
	mongoose.connect(
		process.env.MONGOURL || 'mongodb://localhost:27017/swiftsheet',
		{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
	);
	const db = mongoose.connection;

	db.on('error', error => {
		// Show any mongoose errors
		console.error(`${chalk.red('Mongoose Error: ')} ${error}`);
	});
};

setTimeout(connect, process.env.DOCKER ? 15000 : 0);
//===Routes===
require('./backend/controller/routes.js')(app);

//===Sentry===
if (process.env.NODE_ENV === 'production') {
	Sentry.init({
		dsn: 'https://33ebe7e1549640ca9d1b85ea645ea746@sentry.io/1462962',
	});
}

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
