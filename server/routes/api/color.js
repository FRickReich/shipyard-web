'use strict';

const Color = require('../../models/Color');

module.exports = (app) => {
	// Get all data-items.
	app.get('/api/color', (req, res, next) => {
		Color.find().exec().then((color) => res.json(color)).catch((err) => next(err));
	});

	// Create new data-item.
	app.post('/api/color', (req, res, next) => {
		const color = new Color({
			r: req.body.r,
			g: req.body.g,
			b: req.body.b,
			a: req.body.a
		});

		color.save().then(() => res.json(color)).catch((err) => next(err));
	});

	// Delete selected data-item.
	app.delete('/api/color/:id', (req, res, next) => {
		Color.findOneAndDelete({ _id: req.params.id }).exec().then((color) => res.json()).catch((err) => next(err));
	});

	// Edit selected data-item.
	app.put('/api/color/:id/edit', (req, res, next) => {
		Color.findById(req.params.id)
			.exec()
			.then((color) => {
				(color.r = req.body.r), (color.g = req.body.g), (color.b = req.body.b), (color.a = req.body.a);

				color.save().then(() => res.json(color)).catch((err) => next(err));
			})
			.catch((err) => next(err));
	});
};
