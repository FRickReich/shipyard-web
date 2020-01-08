'use strict';

const TranslationCollection = require('../../models/TranslationCollection');

module.exports = (app) => {
	// create a new collection
	app.post(`/api/:userId/translations/collections`, (req, res, next) => {
		const { query } = req;

		const collection = new TranslationCollection({ name: query.name });

		collection.save((err, col) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false,
					message: err
				});
			}

			return res.send({
				success: true,
				message: `Collection ${collection.name} created`
			});
		});
	});

	// get all collections
	app.get(`/api/:userId/translations/collections`, (req, res, next) => {
		TranslationCollection.find().exec().then((collection) => {
			return res.send({
				success: true,
				data: collection
			});
		});
	});

	app.delete(`/api/:userId/translations/collections/:id`, (req, res, next) => {
		TranslationCollection.findOneAndDelete({ _id: req.params.id }).then((collection) => {
			return res.send({
				success: true,
				message: `Collection ${collection.name} deleted`
			});
		});
	});
};
