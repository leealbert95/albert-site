import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from '../img/profile_v2.jpg';
import GalleryIcon from '../img/iconmonstr-picture-1.svg';
import PlacesIcon from '../img/iconmonstr-globe-5.svg';
import ResumeIcon from'../img/iconmonstr-note-38.svg';
import '../stylesheets/Home.css';

class Home extends Component {
  render() {
    return (
    	<div className="home-container">
  			<div className="circle-container">
  				<Link to='/about' title="About Me" style={{ zIndex: -1 }}><img src={ProfilePic}/></Link> 
  			</div>
        <div className="menu">       
          <Link to='/gallery' title="Gallery"><img src={GalleryIcon}/></Link>
          <Link to='/places' title="Places"><img src={PlacesIcon}/></Link>
          <Link to='/resume' title="Resume"><img src={ResumeIcon}/></Link>
        </div>
    	</div>
    );
  }
}

export default Home;
