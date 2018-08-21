import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=&v=3",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultCenter={props.defaultCenter} defaultZoom={15}>
    {props.isMarkerShown &&
      props.searchResults.map((marker, markerId) => (
        <Marker
          animation={2}
          key={marker.id}
          title={marker.name}
          position={{ lat: marker.location.lat, lng: marker.location.lng }}
          onClick={event => {
            props.onToogleOpen(
              event,
              { markerId: marker.id }
            );
          }}
        >
          {props.infoIsOpen && props.selectedMarkerId === marker.id && (
            <InfoWindow onCloseClick={props.onToogleClose}>
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

class MapContainer extends React.PureComponent {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 1000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <MyMapComponent
        defaultCenter={this.props.defaultCenter}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        searchResults = {this.props.searchResults}
        selectedMarkerId={this.props.selectedMarkerId}
        onToogleOpen={this.props.onToogleOpen}
        infoIsOpen={this.props.infoIsOpen}
        onToogleClose={this.props.onToogleClose}
      />
    );
  }
}
export default MapContainer;
