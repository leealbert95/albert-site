import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyMap from '../components/MyMap.js';

class Places extends Component {
 
  render() {
    return (
      <div style={{height: 600}}>
        <MyMap/>
      </div> 
    );
  }
}

export default Places;
