import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group' ;
import Test from '../pages/Test.js';
import Resume from '../pages/Resume.js'
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
    console.log(this.props.location.key);
    return (
      <div style={{ zIndex: -1 }}>
      <TransitionGroup>
        <CSSTransition 
          key={this.props.location.key}
          classNames='page'
          timeout={500}
          mountOnEnter={true}
          unmountOnExit={true}
          exit={false}
        >
          <Switch location={this.props.location}>
            <Route exact path='/' component={Home}/>
            <Route path='/test' component={Test}/>
            <Route path='/about' component={About}/>
            <Route path='/gallery' component={PhotosContainer}/>
            <Route path='/places' component={PlacesContainer}/>
            <Route path='/resume' component={Resume}/>
            <Route path='/uploads' component={Uploads}/>
          </Switch>
        </CSSTransition> 
      </TransitionGroup>
      </div>
    );
  }
}

export default RouteHandler;  