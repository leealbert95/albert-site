var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/albert-site-db');
var db = mongoose.connection; 

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

var imageBase = 
	[{
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
    location: "Hungary",
    tags: [{value: "People", title: "People"}],
    date: "07/10/1995",
    coordinates: {lat: 33.70116, lng: -117.80791}
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 183,
    caption: "37H (gratispgraphy.com)",
    location: "Los Angeles",
    tags: [{value: "Places", title: "Places"}],
    date: "04/21/2001",
    coordinates: {lat: 50.56, lng: -60.235}
  },
  {
    src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
    thumbnailWidth: 271,
    thumbnailHeight: 320,
    caption: "Orange Macro (Tom Eversley - isorepublic.com)",
    location: "Los Angeles",
    tags: [{value: "Food", title: "Food"}],
    date: "10/13/1995",
    coordinates: {lat: -45.56, lng: -40.235}
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "201H (gratisography.com)",
    location: "Beijing",
    tags: [{value: "Photography", title: "Photography"}],
    date: "08/10/2010",
    coordinates: {lat: 12.56, lng: -11.235}
  },
  {
    src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)",
    location: "Portland",
    tags: [{value: "Flowers", title: "Flowers"}],
    date: "06/25/2005",
    coordinates: {lat: 10.56, lng: -50.235}
  },
  {
    src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "Man on BMX (Tom Eversley - isorepublic.com)",
    location: "Nashville",
    tags: [{value: "Sports", title: "Sports"}],
    date: "09/13/2013",
    coordinates: {lat: 80.56, lng: -60.235}
  },
  {
    src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
    caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)",
    location: "Smoky Mountains",
    tags: [{value: "People", title: "People"}],
    date: "07/25/2015",
    coordinates: {lat: -20.56, lng: -40.235}
  },
  {
    src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
    thumbnailWidth: 257,
    thumbnailHeight: 320,
    caption: "A photo by 贝莉儿 NG. (unsplash.com)",
    location: "Griffith Observatory",
    tags: [{value: "Places", title: "Places"}],
    date: "03/19/2010",
    coordinates: {lat: 12.56, lng: -31.235}
  }];

for (i = 0; i < 8; i++) {
	var image = new Image({
		src: imageBase[i].src,
		thumbnail: imageBase[i].thumbnail,
		thumbnailWidth: imageBase[i].thumbnailWidth,
		thumbnailHeight: imageBase[i].thumbnailHeight,
		caption: imageBase[i].caption,
		location: imageBase[i].location,
		tags: imageBase[i].tags,
		date: imageBase[i].date,
		coordinates: imageBase[i].coordinates
	});
	image.save(function(error) {
		console.log("Image Saved");
		if (error) {
			console.error(error);
		}
	});
}

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

module.exports = router;