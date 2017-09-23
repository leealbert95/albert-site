import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Circle from '../img/if_icon-ios7-circle-outline_211717.png';
import ProfilePic from '../img/profile_v2.jpg';
import GalleryIcon from '../img/camera-retro.svg'
import PlacesIcon from '../img/earth-globe.svg'
import '../stylesheets/Home.css';

class Home extends Component {
  render() {
    return (
    	<div className="home-container">
  			<div className="circle-container">
  				<Link to='/about' title="About Me"><img src={ProfilePic}/></Link> 
  			</div>
        <div className="menu">       
          <Link to='/photos' title="Photos"><img src={GalleryIcon}/></Link>
          <Link to='/places' title="Places"><img src={PlacesIcon}/></Link>
        </div>
    	</div>
    );
  }
}

export default Home;
