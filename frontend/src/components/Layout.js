import React, { Component } from 'react';
import Header from './Header.js';
import { Switch, Route } from 'react-router-dom';
import RouteHandler from './RouteHandler.js';

class Layout extends Component {
  render() {
    return (
    	<div>
    		<div style={{ position: "fixed", zIndex: 3, width: "100%" }}>
    			<Header/>
    		</div>
        <div>
      	  <RouteHandler/>
        </div>
      </div>
    );
  }
}

export default Layout;