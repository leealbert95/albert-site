import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';


const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
  	{props.markers.map(marker => 
  		<Marker
  			position={marker.position}
  			onClick={() => props.onMarkerClick(marker)}
  			defaultAnimation={marker.defaultAnimation}
  		/>
  	)} 
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
          <div id="hahah" style={{ height: `90%`, width: '75%', marginLeft: '12.5%', marginTop: '4%' }} />
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

