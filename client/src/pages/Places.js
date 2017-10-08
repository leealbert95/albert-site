import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyMap from '../components/MyMap.js';

class Places extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: [] 
    }
  }

  componentDidMount() {
    fetch('api/places')
      .then(res => res.json())
      .then(markers => this.setState({ markers }));
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.props.resetCoordinates();
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.center) !== JSON.stringify(nextProps.center)) {
      this.setState({

      })
    }
  }
 
  render() {
    const defaultCenter = { lat: 20, lng: 0 };
    const zoom = this.props.center ? 12 : 2;
    const center = this.props.center ? this.props.center : defaultCenter;
    console.log(center);
    return (
      <div style={{height: 650, overflow: "hidden", paddingTop: "50px"}}>
        <MyMap 
          markers={this.state.markers}
          zoom={zoom}
          center={center}
        />
      </div> 
    );
  }
}

export default Places;
