import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group' ;
import Test from '../pages/Test.js';
import Resume from '../pages/Resume.js'
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Projects from '../pages/Projects.js';
import TravelLog from '../pages/TravelLog.js';
import PhotosContainer from '../containers/PhotosContainer.js';
import PlacesContainer from '../containers/PlacesContainer.js';
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
            <Route path='/resume' component={Resume}/>
            <Route exact path='/projects' component={Projects}/>
            <Route exact path='/projects/travel' component={TravelLog}/>
            <Route path='/projects/travel/gallery' component={PhotosContainer}/>
            <Route path='/projects/travel/places' component={PlacesContainer}/>
          </Switch>
        </CSSTransition> 
      </TransitionGroup>
      </div>
    );
  }
}

export default RouteHandler;  