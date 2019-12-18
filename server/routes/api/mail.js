'use strict';

const User = require('../../models/User');
const url = require('url');
const nodemailer = require('nodemailer');
const SHA256 = require('crypto-js/sha256');

const transport = {
	host: 'smtp.office365.com',
	auth: {
		user: 'khaaaaaaaan@botany-bay.com',
		pass: 'ChrisPine09!'
	}
};

const transporter = nodemailer.createTransport(transport);

module.exports = (app) => {
	app.get(`/api/:userId/mail`, (req, res, next) => {
		var mail = {
			from: 'botany-bay.com',
			to: req.params.userId,
			subject: 'Welcome to botany-bay.com',
			text: `click on http://botany-bay.com:8080/api/verify?user=${req.params.userId}&token=${SHA256(
				req.params.userId
			).toString()}`
		};

		transporter.sendMail(mail, (err) => {
			if (err) {
				res.json({
					success: false,
					message: 'Error: Email settings wrong.'
				});
			}
			else {
				res.json({
					success: true,
					message: 'Email sent.'
				});
			}
		});
	});

	app.get(`/api/verify`, (req, res, next) => {
		const { query } = req;

		User.findOne({ email: query.user }, (err, user) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false
				});
			}

			if (user.verificationToken) {
				if (user.verificationToken === query.token) {
					User.findOneAndUpdate(
						{ email: user.email },
						{
							$set: {
								isVerified: true
							}
						},
						() => {
							res.redirect(
								url.format({
									pathname: '/dashboard',
									query: {
										verified: true
									}
								})
							);
						}
					);
				}
				else {
					res.send({
						success: false
					});
				}
			}
		});
	});
};
