'use strict';

const Data = require('../../models/Data');

module.exports = (app) => {
	// Get all data-items.
	app.get('/api/data', (req, res, next) => {
		Data.find().exec().then((counter) => res.json(counter)).catch((err) => next(err));
	});

	// Create new data-item.
	app.post('/api/data', (req, res, next) => {
		const data = new Data({
			data: req.body.data
		});

		data.save().then(() => res.json(data)).catch((err) => next(err));
	});

	// Delete selected data-item.
	app.delete('/api/data/:id', (req, res, next) => {
		Data.findOneAndDelete({ _id: req.params.id }).exec().then((data) => res.json()).catch((err) => next(err));
	});

	// Edit selected data-item.
	app.put('/api/data/:id/edit', (req, res, next) => {
		Data.findById(req.params.id)
			.exec()
			.then((data) => {
				data.data = 'Hello Api!';

				data.save().then(() => res.json(data)).catch((err) => next(err));
			})
			.catch((err) => next(err));
	});
};
