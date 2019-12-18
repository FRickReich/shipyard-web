'use strict';

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
			text: `click on <a href="botany-bay.com:8080/verify?user=${req.params.user}&token=${SHA256(
				req.params.userId
			).toString()}>verification link</a>.`
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
};
