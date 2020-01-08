'use strict';

const Log = require('../../models/Log');

module.exports = (app) => {
	app.get('/api/:userId/log/', (req, res, next) => {
		Log.find({ user: req.params.userId }, (err, log) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false
				});
			}

			return res.send({
				success: true,
				data: log
			});
		});
	});
};
