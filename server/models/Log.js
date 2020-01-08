'use strict';

const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now()
	},
	action: {
		type: String,
		default: '[Log message]'
	},
	user: {
		type: String
	},
	status: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Log', LogSchema);
