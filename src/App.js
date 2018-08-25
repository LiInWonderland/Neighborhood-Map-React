import React,  { Component }  from "react";
import "./styles/app.min.css";
import { Route } from 'react-router-dom'
import SearchResults from './components/SearchResults'
import { Link } from 'react-router-dom'
import { compose, withProps, lifecycle } from "recompose";
import { Button, FormControl, Jumbotron, Glyphicon } from 'react-bootstrap';
import {
  withScriptjs
} from "react-google-maps";
import xlarge from './images/restaurant-searchImg.jpg';
import large from './images/restaurant-searchImg-large.jpg';
import medium from './images/restaurant-searchImg-medium.jpg';
import small from './images/restaurant-searchImg-small.jpg';
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

      <Jumbotron>
        <img src={large} alt="Restaurant Search - EAT" url="https://unsplash.com/photos/FH3nWjvia-U"/>
        <div className="col-sm-7">
           <h1>Restaurant search</h1>
           <p>Search for location and find restaurant near it!</p>
           <div className="col-sm-1">
               <Glyphicon glyph="home" />
           </div>
          <div className="col-sm-9">
            <StandaloneSearchBox
              ref={props.onSearchBoxMounted}
              bounds={props.bounds}
              onPlacesChanged={props.onPlacesChanged}
            >
              <FormControl
                type="text"
                placeholder="Your location"
              />
            </StandaloneSearchBox>
          </div>
          <div className="col-sm-2">

              {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>

                  <Link to="/restaurant-search">  <Button onClick={()=>props.getLocation(location)}>GO</Button></Link>


              )}

          </div>
        </div>

    </Jumbotron>


));

class App extends Component {


  state = {
    placeLatLng: [],
    currentSrc: ''
  }
  onLoad = (event) => {
    this.setState({
      currentSrc: event.target.currentSrc
    });
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
              onLoad={this.onLoad}
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
