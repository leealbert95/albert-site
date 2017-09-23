import React, { Component } from 'react';
import Header from './Header.js';
import { Switch, Route } from 'react-router-dom';
import RouteHandler from './RouteHandler.js';
import '../stylesheets/Background.css';

class Layout extends Component {
  render() {
    return (
    	<div className="layout">
    		<div style={{ position: "fixed", zIndex: 3, width: "100%", height: '50px' }}>
    			<Header/>
    		</div>
        <div className="background">
      	  <RouteHandler/>
        </div>
      </div>
    );
  }
}

export default Layout;