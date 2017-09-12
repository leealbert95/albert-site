var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var uid = require('uid-safe');
var mime = require('mime');
var util = require('util');
mongoose.connect('mongodb://leea8:albertdb@ds121464.mlab.com:21464/albert-site-db');
var db = mongoose.connection; 

var Image = require('./schemas/ImageSchema');
var Marker = require('./schemas/MarkerSchema'); 

var IMAGE_TYPES = ['image/jpeg', 'image/png'];

var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'albert-site-photos',
	api_key: '748939627676922',
	api_secret: 'sD2c8Vi18_jb4Gz03pNCtDb87rI'
});


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

	if (!req.files) {
		return res.send(415, 'No file submitted'); 
	}

	var type = req.files[0].mimetype;

	if (IMAGE_TYPES.indexOf(type) == -1) {
		return res.send(415, 'Unsupported image type: Must be jpeg, jpg, jpe, or png');
	}	

	var tempPath = req.files[0].path;

	cloudinary.v2.uploader.upload(tempPath, {angle: "exif"}, function (err, result) {
		if (err) {
			return handleError(err); 
		}

		var tagArray = getTagArray(req.body.tags);

		var newImage = new Image({
			src: result.url,
			thumbnail: result.url,
			thumbnailWidth: result.width,
			thumbnailHeight: result.height,
			caption: req.body.caption,
			location: req.body.location,
			tags: tagArray,
			date: req.body.date,
			coordinates: { lat: req.body.lat, lng: req.body.lng },
		});	

		console.info(req.body.tags); 

		newImage.save(function(err) {
			if (err) return handleError(err);
		});
	});


	deleteTempFile(tempPath);
	addToMarkers(req);

	res.send('Post Finished');
});

router.delete('/delete', function(req, res, next) {
	console.log('delete request');
	cloudinary.v2.api.delete_all_resources();
	Image.remove(function(err) {
		if (err) return handleError(err);
	});
	Marker.remove(function(err) {
		if (err) return handleError(err);
	});

	res.send('Delete Finished');
})

//Helper functions/methods
function deleteTempFile(tempPath) {
	fs.unlink(tempPath, function(err) {
		if (err) return handleError(err);
	})
}

function addToMarkers(req) {
	var lat = req.body.lat;
	var lng = req.body.lng;
	var key = req.body.location
	var newMarker = new Marker({
		position: { lat: lat, lng: lng },
		key: key,
		defaultAnimation: 2,
	});
	Marker.findOne({ 'position.lat': lat, 'position.lng': lng })
		.exec(function(err, marker) {
			if (!marker) {
				newMarker.save(function(err) {
					if(err) return handleError(err);
				});
			}
		})
}

function getTagArray(tags) {
		var tagValues = tags.split(' ');
		var tagArray = [];
		var length = tagValues.length;
		var tag;
		var tag_sc; // Tag in Start Case format (Only first letter capitalized)

		for (var i = 0; i < length; i++) {	
			console.log(tagValues[i]);
			if (tagValues[i].replace(/\s/g, '').length > 0) {
				tag = tagValues[i].toLowerCase();
				tag_sc = tag.charAt(0).toUpperCase() + tag.slice(1); 
				tagArray.push({ title: tag_sc, value: tag_sc });
			}
		}
		return tagArray; 
	}

module.exports = router;