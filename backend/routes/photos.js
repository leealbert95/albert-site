var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var uid = require('uid-safe');
var mime = require('mime');
mongoose.connect('mongodb://leea8:albertdb@ds121464.mlab.com:21464/albert-site-db');
var db = mongoose.connection; 

var IMAGE_TYPES = ['image/jpeg', 'image/png'];

var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'albert-site-photos',
	api_key: '748939627676922',
	api_secret: 'sD2c8Vi18_jb4Gz03pNCtDb87rI'
});

var imageSchema = mongoose.Schema({
	src: String,
	thumbnail: String,
	thumbnailWidth: Number,
	thumbnailHeight: Number,
	caption: String,
	location: String,
	tags: [{ value: String, title: String }],
	date: String,
	coordinates: { lat: Number, lng: Number }
});

var Image = mongoose.model("Image", imageSchema); 

/* GET users listing. */
router.get('/', function(req, res, next) {
	Image.find()
	.exec(function(err, images) {
		if (!images) {
			res.send("Error: No Photos");
		} else {
			res.json(images); 
		}
	});
});

router.post('/uploads', function(req, res, next) {

	var type = req.files[0].mimetype;

	if (IMAGE_TYPES.indexOf(type) == -1) {
		return res.send(415, 'Unsupported image type: Must be jpeg, jpg, jpe, or png');
	}	

	cloudinary.uploader.upload(req.files[0].path, function (result) {
		var newImage = new Image({
			src: result.url,
			thumbnail: result.url,
			thumbnailWidth: result.width,
			thumbnailHeight: result.height,
			caption: req.body.caption,
			location: req.body.location,
			tags: [{ value: "People", title: "People" }],
			date: req.body.date,
			coordinates: { lat: req.body.lat, lng: req.body.lng },
		});

		console.log(req.body.lat);

		newImage.save(function(err) {
			if (err) return handleError(err);
		});
	});
});

module.exports = router;