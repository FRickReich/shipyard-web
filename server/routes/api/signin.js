'use strict';

const usernameGenerator = require('xm-username-generator');
const SHA256 = require('crypto-js/sha256');

const User = require('../../models/User');
const Project = require('../../models/Project');
const UserSession = require('../../models/UserSession');
const Log = require('../../models/Log');

module.exports = (app) => {
	app.post('/api/account/signup', (req, res, next) => {
		const { body } = req;
		const { password } = body;

		let { email } = body;

		if (!email) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		}

		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

		email = email.toLowerCase();
		email = email.trim();

		User.find(
			{
				email: email
			},
			(err, previousUsers) => {
				if (err) {
					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}
				else if (previousUsers.length > 0) {
					return res.send({
						success: false,
						message: 'Error: Account already exist.'
					});
				}

				const newUser = new User();

				newUser.username = usernameGenerator.getUsername();
				newUser.email = email;
				newUser.password = newUser.generateHash(password);
				newUser.verificationToken = SHA256(email).toString();

				newUser.save((err, user) => {
					new Log({ action: 'User Signed up', user: user._id }).save();
					if (err) {
						return res.send({
							success: false,
							message: 'Error: Server error'
						});
					}

					return res.send({
						success: true
						//message: 'Signed up'
					});
				});
			}
		);
	});

	app.post('/api/account/signin', (req, res, next) => {
		const { body } = req;
		const { password } = body;
		let { email } = body;

		if (!email) {
			return res.send({
				success: false,
				message: 'Error: Email cannot be blank.'
			});
		}

		if (!password) {
			return res.send({
				success: false,
				message: 'Error: Password cannot be blank.'
			});
		}

		email = email.toLowerCase();
		email = email.trim();

		User.find(
			{
				email: email
			},
			(err, users) => {
				if (err) {
					console.log('err 2:', err);
					return res.send({
						success: false,
						message: 'Error: server error'
					});
				}

				if (users.length != 1) {
					return res.send({
						success: false,
						message: 'Error: Wrong credentials'
					});
				}

				const user = users[0];

				if (!user.validPassword(password)) {
					return res.send({
						success: false,
						message: 'Error: Invalid'
					});
				}

				const userSession = new UserSession();

				userSession.userId = user._id;

				userSession.save((err, doc) => {
					new Log({ action: 'User signed in', user: user._id }).save();

					if (err) {
						console.log(err);
						return res.send({
							success: false,
							message: 'Error: server error'
						});
					}
					return res.send({
						success: true,
						message: 'Valid sign in',
						token: doc._id
					});
				});
			}
		);
	});

	app.get('/api/account/createusername', (req, res, next) => {
		return res.send({
			success: true,
			message: usernameGenerator.getUsername()
		});
	});

	app.get('/api/account/verify', (req, res, next) => {
		const { query } = req;
		const { token } = query;

		UserSession.find(
			{
				_id: token,
				isDeleted: false
			},
			(err, sessions) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				if (sessions.length != 1) {
					return res.send({
						success: false,
						message: 'Error: Invalid'
					});
				}
				else {
					return res.send({
						success: true,
						message: 'Verification successful'
					});
				}
			}
		);
	});

	app.get('/api/account/logout', (req, res, next) => {
		const { query } = req;
		const { token } = query;

		UserSession.findOneAndUpdate(
			{
				_id: token,
				isDeleted: false
			},
			{
				$set: {
					isDeleted: true
				}
			},
			null,
			(err, sessions) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false,
						message: 'Error: Server error'
					});
				}

				return res.send({
					success: true,
					message: 'Logout successful'
				});
			}
		);
	});

	app.get('/api/user/:userId', (req, res, next) => {
		User.findOne({ username: req.params.userId }, (err, user) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false
				});
			}

			Project.find(
				{
					team: {
						$in: [
							user._id
						]
					}
				},
				(err, projects) => {
					if (err) {
						console.log(err);

						return res.send({
							success: false
						});
					}

					return res.send({
						success: true,
						data: {
							email: user.email,
							username: user.username,
							firstname: user.firstname,
							lastname: user.lastname,
							country: user.country,
							company: user.company,
							website: user.website,
							image: user.image,
							signUpDate: user.signUpDate,
							isVerified: user.isVerified,
							projects: projects,
							id: user._id
						}
					});
				}
			);
		});
	});

	app.get('/api/account/', (req, res, next) => {
		const { query } = req;

		UserSession.findById(query.id, (err, data) => {
			User.findById(data.userId, (err, user) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false
					});
				}

				return res.send({
					success: true,
					data: {
						email: user.email,
						username: user.username,
						firstname: user.firstname,
						lastname: user.lastname,
						country: user.country,
						company: user.company,
						website: user.website,
						image: user.image,
						signUpDate: user.signUpDate,
						isVerified: user.isVerified,
						isDeleted: user.isDeleted,
						id: user._id
					}
				});
			});
		});
	});

	app.get('/api/user/:userId/username', (req, res, next) => {
		User.findById(req.params.userId, (err, user) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false
				});
			}

			return res.send({
				success: true,
				data: user.username
			});
		});
	});

	app.put('/api/account/', (req, res, next) => {
		const { query } = req;
		const { body } = req;

		UserSession.findById(query.id, (err, data) => {
			User.findById(data.userId, (err, user) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false
					});
				}

				user.username = body.username;
				user.firstname = body.firstname;
				user.lastname = body.lastname;
				user.country = body.country;
				user.company = body.company;
				user.website = body.website;
				user.image = body.image;

				user
					.save()
					.then(() => {
						new Log({ action: 'Changes in user profile', user: user._id }).save();

						res.json({
							success: true,
							data: {
								email: user.email,
								username: user.username,
								firstname: user.firstname,
								lastname: user.lastname,
								country: user.country,
								image: user.image,
								company: user.company,
								website: user.website,
								signUpDate: user.signUpDate,
								isVerified: user.isVerified,
								isDeleted: user.isDeleted
							}
						});
					})
					.catch((err) => next(err));
			});
		});
	});
};
