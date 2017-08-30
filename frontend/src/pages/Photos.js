import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/gallery-components/Gallery.js';
import PropTypes from 'prop-types';

class Photos extends Component {
 
  constructor(props) {
    super(props);
    
    this.state = {
      images: [],
      currentImage: 0
    };

    this.sortGallery = this.sortGallery.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByTag = this.sortByTag.bind(this);
    this.sortByLocation = this.sortByLocation.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this); 
    this.getCurrentImage = this.getCurrentImage.bind(this);
  }

  componentDidMount() {
    fetch('/photos')
      .then(res => res.json())
      .then(images => this.setState({ images }));
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
    var cur = this.state.currentImage
    this.props.getPhotosData(this.state.images[cur]);

    this.props.history.push('/places');
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

 
