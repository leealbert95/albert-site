import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/gallery-components/Gallery.js';
import PropTypes from 'prop-types';

class Photos extends Component {
 
  constructor(props) {
    super(props);
    
    this.state = {
      imageBase: [], // Holds all photos returned by initial GET request, to eliminate the need for more GET requests 
      images: [], // Holds current state's photos, contents may change depending on user's search and sort options
      displayedImages: [], // Holds current photos to display (for smoother performance) 
      currentImage: 0, // Current photo being viewed 
      currentPage: 1,
      numPages: '',
      MAX_DISPLAY: 23,
    };

    this.handleGalleryState = this.handleGalleryState.bind(this);
    this.sortGallery = this.sortGallery.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByTag = this.sortByTag.bind(this);
    this.sortByLocation = this.sortByLocation.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this); 
    this.getCurrentImage = this.getCurrentImage.bind(this);
    this.changePage = this.changePage.bind(this); 
  }

  componentDidMount() {
    fetch('api/photos')
      .then(res => res.json())
      .then(images => this.handleGalleryState(images, true));
  }

  //Called whenever there is a change to gallery (Search, sort, etc)
  //Images must be an array of images
  handleGalleryState(images, initialMount) {
    var imagePages = [];
    var imagePage = [];
    var counter = 0;
    for (var i = 0; i < images.length; i++) {
      imagePage.push(images[i]);
      counter++; 
      if (counter == this.state.MAX_DISPLAY || i == images.length-1) {
        imagePages.push(imagePage);
        imagePage = [];
        counter = 0; 
      }
    }
    console.log(imagePages.length);
    console.log(imagePages[1]);
    if (initialMount) { // Only when componeent is first mounted
      this.setState({ 
        images: imagePages, 
        imageBase: images, 
        displayedImages: imagePages[0], 
        currentPage: 1,
        numPages: imagePages.length
      });
    } else {
      this.setState({ 
        images: imagePages, 
        displayedImages: imagePages[0], 
        currentPage: 1,
        numPages: imagePages.length
      });
    }
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

  // Main function to handle sort requests
  sortGallery() {
    console.log('sortGallery called');
    var command = this.refs.sortSelector.value;
    var images = [];

    for (var i = 0; i < this.state.images.length; i++) {
      for (var j = 0; j < this.state.images[i].length; j++) {
        images.push(this.state.images[i][j]);
      }
    }

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

    this.handleGalleryState(images, false);
  }

  // Function to be called when user clicks location icon in lightbox
  onButtonClick(e) {
    e.preventDefault();

    var cur = this.state.currentImage
    this.props.getPhotosData(this.state.displayedImages[cur]);
    this.props.history.push('/places');
  }

  changePage() {
    var page = this.refs.selector.value;
    this.setState({
      displayedImages: this.state.images[page - 1],
      currentImage: 0,
      currentPage: page,
    })
  }

  // Tracks which image is being currently viewed in gallery component
  getCurrentImage(cur) {
    this.setState({
      currentImage: cur
    });
  }

  render() {
  
    var options = [];

    for (var i = 1; i <= this.state.numPages; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    
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
      this.state.displayedImages.map((i) => {
        i.customOverlay = (
          <div style={captionStyle}>
          <div>{i.caption}</div>
          <div style = {{height: 5}}/>
          <div>Location: {i.location}</div>
          <div style={{paddingTop: "10px"}}>Date: {i.date}</div>
          </div>);
        return i;
      });

    //var _react = require('react');

    console.log(this.state.currentImage);
    
    return (
      <div style={{ backgroundColor: "rgba(255,255,255,0)", height: "100%", paddingTop: "70px" }}>
        <select id="mySelect" onChange = {this.sortGallery} ref="sortSelector">
          <option value="date-newest" >Date (Newest)</option>
          <option value="date-oldest">Date (Oldest)</option>    
          <option value="location">Location</option>
          <option value="tag">Tag</option>
        </select>
        <select id="pageSelect" onChange = {this.changePage} value = {this.state.currentPage} ref="selector">
          {options}
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

 
