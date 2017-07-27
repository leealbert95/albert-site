import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Test from '../pages/Test.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';

class App extends Component {
	
  render() {
    return (
    	<Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/test' component={Test}/> 
        <Route path='/about' component={About}/>
      </Switch>
    );
  }
}

export default App;