import React,  { Component }  from "react";
import "./styles/app.min.css";
import { Route } from 'react-router-dom'
import SearchResults from './components/SearchResults'
import { Link } from 'react-router-dom'
import { compose, withProps, lifecycle } from "recompose";
import { Button, FormControl, Jumbotron, Glyphicon, Alert, Modal } from 'react-bootstrap';
import {
  withScriptjs
} from "react-google-maps";
import large from './images/restaurant-searchImg-large.jpg';
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
    componentDidCatch(error, info) {
        console.log(error)
        alert("There was an Error! Cant load google maps API.")
    },
  }),
  withScriptjs
)(props => (

      <Jumbotron role="Search"  style={props.backImage} >
        <div className="col-sm-7">
           <a href="/"><h1>Restaurant search</h1></a>
           <p>Search for location and find restaurant near it!</p>
           <div className="col-sm-2">
               <Glyphicon glyph="home" />
           </div>
          <div className="col-sm-8">
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
                  <Link to="/restaurant-search" key="location" onClick={()=>props.getLocation(location)}><Button tabIndex="-1">GO</Button></Link>

              )}

          </div>
        </div>

    </Jumbotron>


));

class App extends Component {
  state = {
    placeLatLng: [],
    currentSrc: '',
    error:false
  }
  componentDidMount(){
    this.checkIfGoogleAPIIsLoaded()
  }
  checkIfGoogleAPIIsLoaded(){
    if(window.google && window.google.maps){
      this.setState({
        error:false
      })
    }else{
      this.setState({
        error:true
      })
    }
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
    let backImage = {
      backgroundImage:`url(${large})`,
      height: "100%",
      margin: "0px",
      backgroundPosition: "center",
      backgroundSize: "cover"
    }
    return (
        <div id="root">
          <Route exact path="/" render={()=>(
            <SearchContainer
              backImage={backImage}
              getLocation={this.getLocation}
              placeLatLng={this.state.placeLatLng}
              onLoad={this.onLoad}
            />
          )} />

          <Route path="/restaurant-search" render={()=>(
              <SearchResults
                getLocation={this.getLocation}
                placeLatLng={this.state.placeLatLng}
                checkIfGoogleAPIIsLoaded={this.checkIfGoogleAPIIsLoaded}
              />

          )} />
          {this.state.hasError && (
            <Modal show={this.state.hasError} role="Alert">
              <Alert bsStyle="danger">
                <h4>Oh snap! You got an error!</h4>
                <p>
                  Could not load GoogleAPI. Map or Locations won't be loaded or updated!
                </p>
                <Link href="/"><Button>Ok, got it!</Button></Link>
              </Alert>
            </Modal>
          )}
        </div>
    );
  }
}
export default App;
