
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import * as placesAPI from '../placesAPI';
import MapMarkers from './MapMarkers'

class MapContainer extends Component {
  state = {
    locations: []
  }
  componentDidMount(){
    placesAPI.getPlaces()
    .then((locations)=>{
      this.setState({locations})
      console.log(locations)
    }).catch((error)=>{
      console.log('Erorr while loading locations')
    })
  }
  render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {  lat: 56.949649, lng: 24.105186 } }
        defaultZoom = { 15 }
      >
      </GoogleMap>
   ));
   return(
      <div className="mapContainer">
        <GoogleMapExample
          containerElement={ <div style={{ height: `100%`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
        <MapMarkers
          locations = {this.state.locations}/>
      </div>
   );
   }
};
export default MapContainer;
