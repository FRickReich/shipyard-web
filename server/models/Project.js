'use strict';

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		default: 'Default Project'
	},
	isActive: {
		type: Boolean,
		default: false
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
	description: {
		type: String,
		default: ''
	},
	website: {
		type: String,
		default: ''
	},
	team: [
		String
	]
});

module.exports = mongoose.model('Project', ProjectSchema);

/* - logo - category - target marketplace - monetarization */
