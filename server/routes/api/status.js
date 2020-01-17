module.exports = (app) => {
	app.get(`/api/status/`, (req, res, next) => {
		res.json({
			success: true,
			data: {
				projectTitle: 'TestProject',
				messageOfTheDay: {
					header: 'TestMessage',
					body: 'This is a test message'
				},
				characters: [
					{
						id: 0,
						name: 'Rick',
						class: 'sorcerer'
					},
					{
						id: 1,
						name: 'Tony',
						class: 'scientist'
					}
				]
			}
		});
	});
};
