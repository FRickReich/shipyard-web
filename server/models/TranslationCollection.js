'use strict';

const mongoose = require('mongoose');

const TranslationCollectionSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model('TranslationCollection', TranslationCollectionSchema);
