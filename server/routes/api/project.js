'use strict';

const Project = require('../../models/Project');
const UserSession = require('../../models/UserSession');
const User = require('../../models/User');

module.exports = (app) => {
	const getUsername = async (userId) => {
		await User.findById(userId, (err, user) => {
			return user.username;
		});
	};

	// Get all projects connected to user
	app.get(`/api/:userId/projects/`, (req, res, next) => {
		Project.find(
			{
				team: {
					$in: [ req.params.userId ]
				}
			},
			(err, projects) => {
				if (err) {
					console.log(err);

					return res.send({
						success: false,
						message: 'Error: Could not find projects'
					});
				}

				return res.send({
					success: true,
					data: projects
				});
			}
		);
	});

	// Get single project connected to user
	app.get(`/api/:userId/projects/:projectId`, (req, res, next) => {
		Project.find({
			team: {
				$in: [ req.params.userId ]
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
		const { body } = req;

		UserSession.findById(query.id, (err, data) => {
			const project = new Project();
			project.title = body.title;
			project.description = body.description;
			project.image = body.image;
			project.createdby = data.userId;

			project.team.push(data.userId);

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
