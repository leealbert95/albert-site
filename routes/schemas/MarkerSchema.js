var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markerSchema = new Schema({
	position: { lat: Number, lng: Number },
	key: String,
	defaultAnimation: Number,
})

module.exports = mongoose.model("Marker", markerSchema);