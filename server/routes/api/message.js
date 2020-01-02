'use strict';

const Message = require('../../models/Message');

module.exports = (app) => {
	app.get('/api/:userId/message/all', (req, res, next) => {
		Message.find({ createdby: req.params.userId })
			.exec()
			.then((message) => res.json(message))
			.catch((err) => next(err));
	});

	app.post('/api/:userId/message/new', (req, res, next) => {
		const { body } = req;

		console.log(body);

		const message = new Message();

		message.text = body.text;
		message.createdby = req.params.userId;

		message.save((err) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			}

			return res.send({
				success: true,
				message: 'Message created'
			});
		});

		console.log(body);
	});
};
