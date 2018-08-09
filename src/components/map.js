import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class MapContainer extends Component {
  render() {
    const markers = this.props.markers;
    const MyGoogleMap = withGoogleMap(props => (
      <GoogleMap defaultCenter={this.props.defaultCenter} defaultZoom={17}>
        {markers.map((marker, markerId) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.location.lat, lng: marker.location.lng }}
            onClick={event => {
              this.props.onToogleOpen(
                event,
                { lat: marker.location.lat, lng: marker.location.lng },
                { markerId }
              );
            }}
          >
            {this.props.selectedMarkerId === markerId && (
              <InfoWindow onCloseClick={this.onToogleClose}>
                <div className="infoWindowContent">
                  <h5>Name:{marker.name}</h5>
                  <p>
                    Adress:{marker.location.address}, {marker.location.city}{" "}
                  </p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    ));
    return (
      <div className="mapContainer">
        <MyGoogleMap
          containerElement={<div style={{ height: `100%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default MapContainer;
