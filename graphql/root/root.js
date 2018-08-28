const SwiftSheet = require('../../model/swiftsheetDB');
const mongoose = require('mongoose');

// TODO: sample data - delete below
let coursesData = [
	{
		id: 1,
		title: 'The Complete Node.js Developer Course',
		author: 'Andrew Mead, Rob Percival',
		description:
			'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
		topic: 'Node.js',
		url: 'https://codingthesmartway.com/courses/nodejs/',
	},
	{
		id: 2,
		title: 'Node.js, Express & MongoDB Dev to Deployment',
		author: 'Brad Traversy',
		description:
			'Learn by example building & deploying real-world Node.js applications from absolute scratch',
		topic: 'Node.js',
		url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
	},
	{
		id: 3,
		title: 'JavaScript: Understanding The Weird Parts',
		author: 'Anthony Alicea',
		description:
			'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
		topic: 'JavaScript',
		url: 'https://codingthesmartway.com/courses/understand-javascript/',
	},
];

const updateCourseTopic = ({ id, topic }) => {
	coursesData.map(course => {
		if (course.id === id) {
			course.topic = topic;
			return course;
		}
	});
	return coursesData.filter(course => course.id === id)[0];
};

const getSheet = async args => {
	return await SwiftSheet.findOne(mongoose.mongo.ObjectId(args._id));
};

const getSheets = async () => {
	return await SwiftSheet.find({});
};

const root = {
	updateCourseTopic,
	sheet: getSheet,
	sheets: getSheets,
};

module.exports = root;
