import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GalleryIcon from '../img/iconmonstr-picture-1.svg';
import PlacesIcon from '../img/iconmonstr-globe-5.svg';
import '../stylesheets/TravelLog.css';

class TravelLog extends Component {
  render() {
    return (
      <div className="travel-log">
        <div className="travel-home">
          <h1>Travel Log</h1>
          <div className="travel-menu">
            <Link to='/projects/travel/gallery' title="Gallery"><img src={GalleryIcon}/></Link>
            <Link to='/projects/travel/places' title="Places"><img src={PlacesIcon}/></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TravelLog;