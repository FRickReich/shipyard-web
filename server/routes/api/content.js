'use strict';

module.exports = (app) => {
	app.get(`/api/:userId/content/message-of-the-day`, (req, res, next) => {
		res.json({
			items: [
				{ user: req.params.userId },
				{ success: true },
				{ message: 'Hello World' }
			]
		});
	});
};
