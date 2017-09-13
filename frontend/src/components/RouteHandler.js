import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';

import Test from '../pages/Test.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import PhotosContainer from '../containers/PhotosContainer.js';
import PlacesContainer from '../containers/PlacesContainer.js';
import Uploads from '../pages/Uploads.js';

class RouteHandler extends Component {

  constructor(props) {
    super(props);
  }
	
  render() {
    console.log('RouteHandler');
    return (
      <Route render={({location, history, match}) => {
        return (
    	    <RouteTransition
            styles={{ position: 'absolute' }}
            pathname={location.pathname}
            atEnter={{ translateX: 100 }}
            atLeave={{ translateX: 0 }}
            atActive={{ translateX: 0 }}
            mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
            runOnMount={false}
          >
            <Switch key={location.key} location={location}>
              <Route exact path='/' component={Home}/>
              <Route path='/test' component={Test}/> 
              <Route path='/about' component={About}/>
              <Route path='/photos' component={PhotosContainer}/>
              <Route path='/places' component={PlacesContainer}/>
              <Route path='/uploads' component={Uploads}/>
            </Switch>
          </RouteTransition>
        );
      }}/>  
    );
  }
}

export default RouteHandler;