import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Test from '../pages/Test.js';
import Home from '../pages/Home.js';

class App extends Component {
	
  render() {
    return (
    	<Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/test' component={Test}/> 
      </Switch>
    );
  }
}

export default App;