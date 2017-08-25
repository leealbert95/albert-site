import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 33.70116, lng: -117.80791 }}
  >
  	{props.markers.map(marker => (
  		<Marker
  			{...marker}
  		/>
  	))}
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MyMap extends Component {

	constructor(props) {
		super(props);

		this.state = {
			markers: [
			{
				position: {
					lat: 130.56, lng: -110.235
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
					lat: -130.56, lng: -40.235
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
					lat: 130.56, lng: -110.235
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
					lat: -20.56, lng: -40.235
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
			]
		}
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
        markers={this.state.markers}
      />
    );
  }
}