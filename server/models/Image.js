'use strict';

const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
	imageName: {
		type: String,
		default: 'none',
		required: true
	},
	imageData: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Image', ImageSchema);
