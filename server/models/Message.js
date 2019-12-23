'use strict';

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	text: {
		type: String,
		default: 'Hello World!'
	},
	created: {
		type: Date,
		default: Date.now()
	},
	updated: {
		type: Date,
		default: Date.now()
	},
	createdby: {
		type: String,
		default: ''
	},
});

module.exports = mongoose.model('Message', MessageSchema);
