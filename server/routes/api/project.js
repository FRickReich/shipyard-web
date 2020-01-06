'use strict';

const Project = require('../../models/Project');

module.exports = (app) => {
	// Get all projects connected to user
	app.get(`/api/:userId/projects/`, (req, res, next) => {
		Project.find({
			team: {
				$in: [
					req.params.userId
				]
			}
		})
			.exec()
			.then((message) => res.json(message))
			.catch((err) => next(err));
	});

	// Get single project connected to user
	app.get(`/api/:userId/projects/:projectId`, (req, res, next) => {
		Project.find({
			team: {
				$in: [
					req.params.userId
				]
			},
			title: req.params.projectId
		})
			.exec()
			.then((message) => res.json(message))
			.catch((err) => next(err));
	});

	// Get single project (by title)
	app.get(`/api/projects/:projectId`, (req, res, next) => {
		Project.find({ title: req.params.projectId })
			.exec()
			.then((message) => res.json(message))
			.catch((err) => next(err));
	});

	// Edit a project
	app.put(`/api/projects/:projectId`, (req, res, next) => {
		res.json({
			version: '1.0',
			success: true
		});
	});

	// Create a new project
	app.post(`/api/projects`, (req, res, next) => {
		const { query } = req;

		const project = new Project();

		project.title = query.title;
		project.createdby = query.userId;
		project.team.push(query.userId);

		project.save((err) => {
			if (err) {
				console.log(err);

				return res.send({
					success: false,
					message: 'Error: Could not create project'
				});
			}

			return res.send({
				success: true,
				message: project
			});
		});
	});

	// Delete a project
	app.delete(`/api/projects/:projectTitle`, (req, res, next) => {
		Project.findOneAndDelete({ title: req.params.projectTitle }).then(() => {
			return res.send({
				success: true,
				message: `project ${req.params.projectTitle} deleted`
			});
		});
	});

	// Get single project statistics connected to user
	// Get single project content
};
