'use strict';

const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
	r: {
		type: Number,
		default: 0
	},
	g: {
		type: Number,
		default: 0
	},
	b: {
		type: Number,
		default: 0
	},
	a: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Color', ColorSchema);
