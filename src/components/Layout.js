import React, { Component } from 'react';
import Header from './Header.js';
import { Switch, Route } from 'react-router-dom';
import Sticky from 'react-sticky-el';
import RouteHandler from './RouteHandler.js';

class Layout extends Component {
  render() {
    return (
    	<div>
    		<Sticky stickyStyle={{zIndex: 2}}>
    			<Header/>
    		</Sticky>
      	<RouteHandler/>
      </div>
    );
  }
}

export default Layout;