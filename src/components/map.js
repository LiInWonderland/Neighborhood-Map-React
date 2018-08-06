import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarkers from './MapMarkers'

const MapContainer = withScriptjs(withGoogleMap((props) =>{
  

    return(
      <GoogleMap
        defaultZoom={14}
        center={ { lat: 56.949649, lng: 24.105186 } }
        >
      <MapMarkers />
      </GoogleMap>

    )

  }
))
export default MapContainer;
