var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
mongoose.connect('mongodb://leea8:albertdb@ds121464.mlab.com:21464/albert-site-db');
var db = mongoose.connection; 

var Marker = require('./schemas/MarkerSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
	Marker.find()
	.exec(function(err, markers) {
		if (!markers) {
			res.send("Error: No Markers");
		} else {
			res.json(markers); 
		}
	});
});


module.exports = router;