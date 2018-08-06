import React, { Component } from 'react';
import { Marker } from "react-google-maps";

class MapMarkers extends Component {
state ={
  markers:[]
}
  render(){
    return(
        <Marker
          position={{lat: 56.946021, lng: 24.095153}}
        >
        </Marker>
    );
  }
}
export default MapMarkers
