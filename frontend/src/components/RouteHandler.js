import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group' ;
import Test from '../pages/Test.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import PhotosContainer from '../containers/PhotosContainer.js';
import PlacesContainer from '../containers/PlacesContainer.js';
import Uploads from '../pages/Uploads.js';
import '../stylesheets/Transition.css';

class RouteHandler extends Component {

  constructor(props) {
    super(props);
  }
	
  render() {
    return (
      <TransitionGroup>
        <CSSTransition 
          key={this.props.location.key}
          classNames='fade'
          timeout={500}
          unmountOnExit={true}
        >
          <Switch location={this.props.location}>
            <Route exact path='/' component={Home}/>
            <Route path='/test' component={Test}/>
            <Route path='/about' component={About}/>
            <Route path='/gallery' component={PhotosContainer}/>
            <Route path='/places' component={PlacesContainer}/>
            <Route path='/uploads' component={Uploads}/>
          </Switch>
        </CSSTransition> 
      </TransitionGroup>
    );
  }
}

export default RouteHandler;  