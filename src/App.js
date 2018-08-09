import React, { Component } from "react";
//import logo from './logo.svg';
import "./styles/app.min.css";
import SideBar from "./components/SideBar";
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapContainer from "./components/map";
import * as placesAPI from "./placesAPI";

class NeighborhoodApp extends Component {
  state = {
    locations: [],
    centerMarker: { lat: 56.951045761814754, lng: 24.112655293535504 },
    defaultCenter: { lat: 56.951045761814754, lng: 24.112655293535504 },
    //isOpen: false,
    selectedMarkerId: -1,
    infoIsOpen: false
  };
  // get all locations from API
  getLocations() {
    placesAPI
      .getPlaces()
      .then(locations => {
        this.setState({ locations });
        console.log(locations);
      })
      .catch(error => {
        alert("Error while loading locations.");
        console.log("Erorr while loading locations");
      });
  }
  componentDidMount() {
    this.getLocations();
  }

  controlLocations = (searchResults, query) => {
      if (query) {
        this.setState(state => ({
          locations: searchResults
        }));
      } else {
        this.setState({ locations: this.state.locations });
      }
  };

  changeMapCenter = () => {
    this.setState({
      defaultCenter: this.state.centerMarker
    });
  };
  infoIsOpen = () => {};

  onToogleOpen = (event, latlng, markerId) => {
    //console.log('markerid',markerId.markerId)
    this.setState({
      centerMarker: latlng,
      selectedMarkerId: markerId.markerId,
      infoIsOpen: true
      //  isOpen:true
    });
    //console.log(this.state.selectedMarkerId)
    this.changeMapCenter();
  };

  onToogleClose() {
    this.setState({
      selectedMarkerId: -1
      //isOpen:false
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="sidebar">
          <h1>this is a side</h1>
          <SideBar
            controlLocations={this.controlLocations}
            markers={this.state.locations}
            onToogleOpen={this.onToogleOpen}
            onToogleClose={this.onToogleClose}
            isOpen={this.state.isOpen}
            selectedMarkerId={this.state.selectedMarkerId}
            defaultCenter={this.state.defaultCenter}
            infoIsOpen={this.state.infoIsOpen}
          />
        </div>
        <div className="col-12 mapContainer">
          <MapContainer
            markers={this.state.locations}
            isOpen={this.state.isOpen}
            selectedMarkerId={this.state.selectedMarkerId}
            onToogleOpen={this.onToogleOpen}
            onToogleClose={this.onToogleClose}
            defaultCenter={this.state.defaultCenter}
          />
        </div>
      </div>
    );
  }
}
export default NeighborhoodApp;
