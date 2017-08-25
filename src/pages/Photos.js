import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/gallery-components/Gallery.js';
import PropTypes from 'prop-types';

class Photos extends Component {
 
  constructor(props) {
    super(props);
    this.props = {
      // base of all images stored, will be used to set initial image prop
      imagebase :
      [{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)",
        location: "Hungary",
        tags: [{value: "People", title: "People"}],
        date: "07/10/1995",
        coordinates: [{lat: 130.56, lng: -110.235}]
      },
      {
        src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 183,
        caption: "37H (gratispgraphy.com)",
        location: "Los Angeles",
        tags: [{value: "Places", title: "Places"}],
        date: "04/21/2001"
      },
      {
        src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
        thumbnailWidth: 271,
        thumbnailHeight: 320,
        caption: "Orange Macro (Tom Eversley - isorepublic.com)",
        location: "Los Angeles",
        tags: [{value: "Food", title: "Food"}],
        date: "10/13/1995"
      },
      {
        src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "201H (gratisography.com)",
        location: "Beijing",
        tags: [{value: "Photography", title: "Photography"}],
        date: "08/10/2010"
      },
      {
        src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
        thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)",
        location: "Portland",
        tags: [{value: "Flowers", title: "Flowers"}],
        date: "06/25/2005"
      },
      {
        src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "Man on BMX (Tom Eversley - isorepublic.com)",
        location: "Nashville",
        tags: [{value: "Sports", title: "Sports"}],
        date: "09/13/2013"
      },
      {
        src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)",
        location: "Smoky Mountains",
        tags: [{value: "People", title: "People"}],
        date: "07/25/2015"
      },
      {
        src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
        thumbnailWidth: 257,
        thumbnailHeight: 320,
        caption: "A photo by 贝莉儿 NG. (unsplash.com)",
        location: "Griffith Observatory",
        tags: [{value: "Places", title: "Places"}],
        date: "03/19/2010"
      }]
    }
    this.state = {
      images: this.props.imagebase,
      currentImage: 0
    };

    this.sortGallery = this.sortGallery.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByTag = this.sortByTag.bind(this);
    this.sortByLocation = this.sortByLocation.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this); 
    this.getCurrentImage = this.getCurrentImage.bind(this);
  }

  sortByDate(images, s) {
    console.log('sortByDate called');
    var value = 1;
    if (s) {
      value = -1;  
    }
    return images.sort(
      function(a,b) {
        var date1 = new Date(a.date);
        var date2 = new Date(b.date);
        if (date1 < date2) 
          return -value;
        if (date1 > date2)
          return value;
        return 0;
      }
    );
  }

  sortByLocation(images) {
    console.log('sortByLocation called');
    return images.sort(
      function(a,b) {
        if (a.location.toLowerCase() < b.location.toLowerCase())
          return -1;
        if (a.location.toLowerCase() > b.location.toLowerCase())
          return 1;
        return 0; 
      }
    );
  }

  sortByTag(images) {
    console.log('sortByTag called');
    return images.sort(
      function(a,b) {
        if (a.tags[0].value.toLowerCase() < b.tags[0].value.toLowerCase())
          return -1;
        if (a.tags[0].value.toLowerCase() > b.tags[0].value.toLowerCase())
          return 1;
        return 0; 
      }
    );
  }

  sortGallery() {
    console.log('sortGallery called');
    var command = this.refs.selector.value;
    var images = this.state.images.slice();
    console.log(command);
    if (command === "date-newest") {
      images = this.sortByDate(images, true);
    } else if (command === "date-oldest") {
      images = this.sortByDate(images, false);
    } else if (command === "location") {
      images = this.sortByLocation(images);
    } else if (command === "tag") {
      images = this.sortByTag(images);
    }
    this.setState({
      images: images
    })
  }

  onButtonClick(e) {
    e.preventDefault();
    console.log(this.state.currentImage);
    this.props.history.push('/' + this.state.currentImage);
  }

  getCurrentImage(cur) {
    this.setState({
      currentImage: cur
    })
  }

  render() {
    const captionStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      maxHeight: "240px",
      overflow: "hidden",
      position: "absolute",
      bottom: "0",
      width: "100%",
      color: "white",
      fontSize: "90%",
    };

    var images =
      this.state.images.map((i) => {
        i.customOverlay = (
          <div style={captionStyle}>
          <div>{i.caption}</div>
          <div style = {{height: 5}}/>
          <div>Location: {i.location}</div>
          <div>Date: {i.date}</div>
          </div>);
        return i;
      });

    //var _react = require('react');
    
    return (
      <div style={{backgroundColor: "rgba(255,255,255,0)", height: "100%"}}>
        <select id="mySelect" onChange = {this.sortGallery} ref="selector">
          <option value="date-newest">Date (Newest)</option>
          <option value="date-oldest">Date (Oldest)</option>    
          <option value="location">Location</option>
          <option value="tag">Tag</option>
        </select>
        <div style={{
          display: "block",
          minHeight: "1px",
          width: "100%",
          border: "1px solid #ddd",
          overflow: "auto"}}>
          <Gallery 
            images={images}
            enableImageSelection={false}
            showLightboxThumbnails={true}
            getCurrentImage={this.getCurrentImage}
            onButtonClick={this.onButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default Photos;

 
