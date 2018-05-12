const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const chalk = require('chalk');
const morgan = require('morgan');


//==Express Setup==
const app = express();
app.set('port', (process.env.PORT || 5000));


//===Morgan Logger Middleware===
app.use(morgan(':method :url :status - :response-time ms'));



//===Parsing===
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


//===Static Files, CSS,Images,Fonts===
app.use(express.static('dist'));

//===Trust First Proxy===
app.set('trust proxy', 1);


//==Start Server==
let server = app.listen(app.get('port'), function() {
	if(process.env.PORT){
		console.log('Running on Port:', app.get('port'),'\n' );
	}else{
		console.log(`Running on: http://localhost:${app.get('port')}\n` );
	}
});

module.exports = server; //for testing