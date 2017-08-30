import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Circle from '../img/if_icon-ios7-circle-outline_211717.png';
import GalleryIcon from '../img/camera-retro.svg'
import PlacesIcon from '../img/earth-globe.svg'
import '../stylesheets/Home.css';

class Home extends Component {
  render() {
    return (
    	<div className="home-container">
    		<nav>
    			<ul className="circle-container">
    				<li className="center"><Link to='/about'><img src={Circle}/></Link></li>    				
    				<li className="deg0"><Link to='/test'><img src={Circle}/></Link></li>
    				<li className="deg45"><Link to='/test'><img src={Circle}/></Link></li>
    				<li className="deg135"><Link to='/test'><img src={Circle}/></Link></li>
    				<li className="deg180" title="Gallery"><Link to='/photos'><img src={GalleryIcon}/></Link></li>
    				<li className="deg225"><Link to='/places' title="Places"><img src={PlacesIcon}/></Link></li>
    				<li className="deg315"><Link to='/test'><img src={Circle}/></Link></li>
    			</ul>
    		</nav>
    	</div>
    );
  }
}

export default Home;
