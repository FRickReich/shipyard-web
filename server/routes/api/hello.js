'use strict';

module.exports = (app) => {
	app.get('/api/hello', (req, res, next) => {
		res.json({
			items: [
				{ message: 'hello' },
				{ message: 'world' }
			]
		});
	});
};
