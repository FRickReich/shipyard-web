'use strict';

const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
	data: {
		type: String,
		default: 'Hello World!'
	}
});

module.exports = mongoose.model('Data', DataSchema);
