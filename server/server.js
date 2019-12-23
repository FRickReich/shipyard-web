require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;
const database = process.env.DATABASE_URL;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

// API routes
require('./routes')(app);

// REACT routes
app.get('*', function(req, res) {
	const content = fs.readFileSync(path.resolve(__dirname, '../public/index.html')).toString();

	res.set('content-type', 'text/html');
	res.send(content);
	res.end();
});

app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
	}

	console.info('=> Server running @ http://0.0.0.0:%s/ in your browser.', port);
});
