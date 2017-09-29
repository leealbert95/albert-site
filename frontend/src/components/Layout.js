import React, { Component } from 'react';
import Header from './Header.js';
import { Route } from 'react-router';
import RouteHandler from './RouteHandler.js';
import '../stylesheets/Background.css';

class Layout extends Component {
  render() {
    return (
    	<div className="layout">
    		<div style={{ position: "fixed", zIndex: "1", width: "100%", height: '0px' }}>
    			<Route component={Header}/>
    		</div>
        <div style={{ zIndex: 8 }} className="background">
      	  <Route component={RouteHandler}/>
        </div>
      </div>
    );
  }
}

export default Layout;