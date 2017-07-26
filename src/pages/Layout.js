import React, { Component } from 'react';
import Header from '../components/Header.js';
import { Switch, Route } from 'react-router-dom';
import Sticky from 'react-sticky-el';
import App from '../components/App.js';

class Layout extends Component {
  render() {
    return (
    	<div>
    		<Sticky>
    			<Header/>
    		</Sticky>
      	<App/>
      </div>
    );
  }
}

export default Layout;