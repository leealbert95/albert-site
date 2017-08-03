import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';
import Test from '../pages/Test.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';

class RouteHandler extends Component {
	
  render() {
    return (
      <Route render={({location, history, match}) => {
        return (
          <div>
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
            </Switch>
          </RouteTransition>
          </div>
        );
      }} />
    );
  }
}

export default RouteHandler;