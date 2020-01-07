'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	username: {
		type: String,
		unique: true,
		default: ''
	},
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	company: {
		type: String,
		default: ''
	},
	country: {
		type: String,
		default: ''
	},
	website: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	signUpDate: {
		type: Date,
		default: Date.now()
	},
	verificationToken: {
		type: String,
		default: ''
	},
	language: {
		type: String,
		default: 'en'
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
