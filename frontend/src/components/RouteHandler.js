import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';
import Test from '../pages/Test.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Photos from '../pages/Photos.js';
import Places from '../pages/Places.js';
import Uploads from '../pages/Uploads.js';

class RouteHandler extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.getPhotosData = this.getPhotosData.bind(this);
    this.getPlacesData.bind(this);
  }

  getPlacesData(data) {
  }

  getPhotosData(data) {
    this.setState({
      mapCenter: data.coordinates
    });
  }
	
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
              <Route path='/photos' render={() => <Photos getPhotosData={this.getPhotosData} history={history}/>}/>
              <Route path='/places' render={() => <Places getPlacesData={this.getPlacesData} center={this.state.mapCenter}/>}/>
              <Route path='/uploads' component={Uploads}/>
            </Switch>
          </RouteTransition>
          </div>
        );
      }} />
    );
  }
}

export default RouteHandler;