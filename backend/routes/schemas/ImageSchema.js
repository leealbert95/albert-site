var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
	title: String,
	value: String,
})

var imageSchema = new Schema({
	src: String,
	thumbnail: String,
	thumbnailWidth: Number,
	thumbnailHeight: Number,
	caption: String,
	location: String,
	tags: [tagSchema],
	date: String,
	coordinates: { lat: Number, lng: Number },
})

module.exports = mongoose.model("Image", imageSchema);