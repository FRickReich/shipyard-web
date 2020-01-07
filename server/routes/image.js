require('dotenv').config();
var express = require('express');
var Image = require('../models/Image');
var ImageRouter = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + file.originalname);
	}
});

let space = new AWS.S3({
	endpoint: process.env.CDN_ENDPOINT,
	useAccelerateEndpoint: false,
	credentials: new AWS.Credentials(process.env.CDN_KEY, process.env.CDN_SECRET, null)
});
const bucketName = 'cdn-botany-bay';

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
		cb(null, true);
	}
	else {
		// rejects storing a file
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

ImageRouter.route('/upload').post(upload.single('imageData'), (req, res, next) => {
	let filePath = req.file.path;

	let params = {
		Bucket: bucketName,
		Key: 'images/' + path.basename(filePath),
		Body: fs.createReadStream(filePath),
		ACL: 'public-read'
	};

	const newImage = new Image({
		imageName: req.body.imageName,
		imageData: 'https://cdn.botany-bay.com/images/' + path.basename(filePath)
	});

	newImage
		.save()
		.then((result) => {
			space.upload(params, function(err, data) {
				if (err) {
					console.error(err);
					res.json({
						success: false
					});
					return;
				}
				res.json({
					success: true,
					filePath: 'https://cdn.botany-bay.com/images/' + path.basename(filePath)
				});

				fs.unlinkSync(filePath);
			});
		})
		.catch((err) => next(err));
});

module.exports = ImageRouter;
