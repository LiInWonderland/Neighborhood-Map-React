import React,  { Component }  from "react";
import "./styles/app.min.css";
import { Route } from 'react-router-dom'
import SearchResults from './components/SearchResults'
import { Link } from 'react-router-dom'
import { compose, withProps, lifecycle } from "recompose";
import { Button } from 'react-bootstrap';
import {
  withScriptjs
} from "react-google-maps";
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const SearchContainer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=&key=AIzaSyAQVcKwgvUjxlOR0-_z84qwQVGFMAbr7Yk",
    loadingElement: <div style={{ height: `100px` }} />,
    containerElement: <div style={{ height: `100px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });
        },
      })
    },
  }),
  withScriptjs
)(props => (
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
      <ol>
        {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
          <li key={place_id}>
            {formatted_address}
            {" at "}
            ({location.lat()}, {location.lng()})
            <Link to="/restaurant-search">  <Button onClick={()=>props.getLocation(location)}>Info</Button></Link>


          </li>
        )}
      </ol>
    </div>


));

class App extends Component {
  state = {
    placeLatLng: []
  }
  getLocation=(placeLocation)=>{
    console.log(placeLocation)
    const placelat = (placeLocation.lat())
    const placelng = (placeLocation.lng())
    console.log(placelat, placelng)
    this.setState({
      placeLatLng: {lat:placelat, lng:placelng}
    })
  }
  render() {

    return (
        <div id="root">
          <Route exact path="/" render={()=>(
            <SearchContainer
              getLocation={this.getLocation}
              placeLatLng={this.state.placeLatLng}
            />
          )} />
          <Route path="/restaurant-search" render={()=>(
              <SearchResults
                getLocation={this.getLocation}
                placeLatLng={this.state.placeLatLng}
              />

          )} />
        </div>
    );
  }
}
export default App;
