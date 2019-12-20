'use strict';

module.exports = (app) => {
	app.get(`/api/:userId/content/message-of-the-day`, (req, res, next) => {
		res.json({
			version: '1.0',
			success: true,
			data: {
				sampleArray: [
					'string value',
					5,
					{
						name: 'sub object'
					}
				]
			}
		});
	});
};
