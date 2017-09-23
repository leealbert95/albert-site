import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';
import Special from '../img/special.svg';


const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
  	{props.markers.map(marker => {
      const icon = JSON.stringify(marker.position) == JSON.stringify(props.center) ? Special : '';
  		return <Marker
  			position={marker.position}
        icon={icon}
  			onClick={() => props.onMarkerClick(marker)}
  			defaultAnimation={marker.defaultAnimation}
  		/>
  	})} 
  </GoogleMap>
));


export default class MyMap extends Component {

	constructor(props) {
		super(props);
		this.onMarkerClick = this.onMarkerClick.bind(this);
	}

	onMarkerClick(marker) {
		console.log(marker.position.lat);
	}

  render() {
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div id="hahah" style={{ height: `80%`, width: '75%', marginLeft: '12.5%', marginTop: '5%' }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        markers={this.props.markers}
        onMarkerClick={this.onMarkerClick}
        zoom={this.props.zoom}
        center={this.props.center}
      />
    );
  }
}

