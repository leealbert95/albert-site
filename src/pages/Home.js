import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Circle from '../img/if_icon-ios7-circle-outline_211717.png';
import '../stylesheets/Home.css';

class Home extends Component {
  render() {
    return (
    	<div>
    		<nav>
    			<ul className="circle-container">
    				<img src={Circle} className="center"/>    				
    				<li className="deg0"><Link to='/test/'><img src={Circle}/></Link></li>
    				<li className="deg45"><Link to='/test/'><img src={Circle}/></Link></li>
    				<li className="deg135"><Link to='/test/'><img src={Circle}/></Link></li>
    				<li className="deg180"><Link to='/test/'><img src={Circle}/></Link></li>
    				<li className="deg225"><Link to='/test/'><img src={Circle}/></Link></li>
    				<li className="deg315"><Link to='/test/'><img src={Circle}/></Link></li>
    			</ul>
    		</nav>
    		<div>
    			<h1>Welcome !</h1>
    			<p>This is my site</p>
    		</div>
    	</div>
    );
  }
}

export default Home;
