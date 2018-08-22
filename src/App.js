import React, { Component } from "react";
//import logo from './logo.svg';
import "./styles/app.min.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapContainer from "./components/map";
import * as PlacesAPI from './placesAPI'
//import placesInRiga from "./placesJSON";
import { Button} from 'react-bootstrap';
import { TransitionGroup } from 'react-transition-group';

class NeighborhoodApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      locations: [],
      allLocations:[],
      centerMap: {  lat: 56.950900, lng: 24.101161 },
      selectedMarkerId: -1,
      infoIsOpen: false,
      query: "",
      showSideBar:true,
      searchResults:null,
      isActive: false
    }
    this.openSideBar = this.openSideBar.bind(this)
    this.closeSideBar = this.closeSideBar.bind(this)
    this.onToogleOpen = this.onToogleOpen.bind(this)
    //this.closeSideBar = this.closeSideBar.bind(this)
  }
  // load foursquare locations
  componentDidMount() {
    PlacesAPI.getPlaces().then((locations)=>{
      this.setState({locations: locations,
      allLocations:locations})
    })
  }
  // load foursquare location details when marker or location on side is clicked

  // open infoWindow, select marker which is clicked and add active class to selected sidebar lcoation
  // when marker or side location is clicked
  onToogleOpen (event, markerId, latlng) {
    console.log('markerid: ',markerId)
    this.setState({
      selectedMarkerId: markerId,
      infoIsOpen: true,
      isActive: true,
      centerMap: latlng
    });
    //this.changeMapCenter()
    console.log('Selected marker id: ',this.state.selectedMarkerId)
  };
  // close infoWindow, reset selected marker to default and remove active class on sidebaf location
  onToogleClose=()=>{
    this.setState({
      infoIsOpen: false,
      selectedMarkerId: -1,
      isActive: false
    });
    console.log('infowindows is closed')
  }
  // close everything and start to search for locations when someone is typing something
  updateQuery = query => {
    this.setState({ query: query,
     infoIsOpen: false,
     isActive: false
   });
    this.controlLocations(query);
  };
  controlLocations = (searchResults, query) => {
      if (query) {
        this.setState({
          locations: searchResults,
        });
      } else {
        this.setState({ locations: this.state.allLocations });
      }
  };
  // close sidebar when button is clicked
  closeSideBar(){
    console.log('The link was clicked -close.');
    this.setState({ showSideBar: false });
  }
  // open sidebar when button is clicked
  openSideBar(){
    console.log('The link was clicked - open.');
    this.setState({ showSideBar: true });
  }
  render() {
    // search form
    const searchResults = this.state.locations.filter(location => {
      return location.name.toLowerCase().indexOf(this.state.query) !== -1;
    });
    return (
      <div className="container-fluid">
        <NavBar
          updateQuery={this.updateQuery}
        />

        <TransitionGroup>
          {this.state.showSideBar &&(

                <SideBar
                  searchResults={searchResults}
                  selectedMarkerId={this.state.selectedMarkerId}
                  onToogleOpen={this.onToogleOpen}
                  onToogleClose={this.onToogleClose}
                  infoIsOpen={this.state.infoIsOpen}
                  closeSideBar={this.closeSideBar}
                  isActive = {this.state.isActive}
                  query={this.state.query}
                />

          )}
          </TransitionGroup>
        <div className="col-12 mapContainer">
          <Button bsStyle="info" className="openbtn" onClick={this.openSideBar} ><span className="glyphicon glyphicon-chevron-right"></span></Button>

          <MapContainer
            searchResults={searchResults}
            selectedMarkerId={this.state.selectedMarkerId}
            onToogleOpen={this.onToogleOpen}
            onToogleClose={this.onToogleClose}
            centerMap={this.state.centerMap}
            infoIsOpen={this.state.infoIsOpen}
          />
        </div>
      </div>
    );
  }
}
export default NeighborhoodApp;
