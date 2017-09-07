import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyMap from '../components/MyMap.js';

class Places extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: [
      {
        position: {
          lat: 33.70116, lng: -117.80791
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 50.56, lng: -60.235
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      {
        position: {
          lat: -45.56, lng: -40.235
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 12.56, lng: -11.235
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 10.56, lng: -50.235
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 80.56, lng: -60.235
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      {
        position: {
          lat: -20.56, lng: -40.235
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      {
        position: {
          lat: 12.56, lng: -31.235
        },
        key: "HAHA",
        defaultAnimation: 2,
      },
      ] 
    }
  }
 
  render() {
    const defaultCenter = { lat: 33.70116, lng: -117.80791 };
    const center = this.props.center ? this.props.center : defaultCenter;
    console.log("coordinates: " + this.props.center);
    return (
      <div style={{height: 600, overflow: "hidden"}}>
        <MyMap 
          markers={this.state.markers}
          center={center}
        />
      </div> 
    );
  }
}

export default Places;
