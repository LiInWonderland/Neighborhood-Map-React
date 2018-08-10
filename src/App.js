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
    allLocations:[],
    centerMarker: { lat: 56.951045761814754, lng: 24.112655293535504 },
    defaultCenter: { lat: 56.951045761814754, lng: 24.112655293535504 },
    //isOpen: false,
    selectedMarkerId: -1,
    selectedLocationId:-1,
    infoIsOpen: false,
    query: ""
  };
  // get all locations from API
  getLocations() {
    placesAPI
      .getPlaces()
      .then(locations => {
        this.setState({ locations });
        this.setState({allLocations:locations})

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
        this.setState({
          locations: searchResults
        });
        console.log('atrasti mekletie markeri', this.state.locations)
      } else {
        this.setState({ locations: this.state.allLocations });
        console.log('vairs nemekle, atpakal visi markeri')
      }
  };

  changeMapCenter = () => {
    this.setState({
      defaultCenter: this.state.centerMarker
    });
  };

  onToogleOpen = (event, latlng, markerId) => {
    console.log('markerid: ',markerId)
    this.setState({
      centerMarker: latlng,
      selectedMarkerId: markerId.markerId,
      infoIsOpen: true
      //  isOpen:true
    });
    console.log('Selected marker id: ',this.state.selectedMarkerId)
    this.changeMapCenter();
  };

  onToogleClose() {
    this.setState({
      selectedMarkerId: -1
      //isOpen:false
    });
  }
  updateQuery = query => {
    this.setState({ query: query });
    this.getSearchedLocations(query);
    //this.controlLocations(this.state.searchedLocations, query);
  };
  getSearchedLocations = query => {

    if (query) {
      const searchResults = this.state.locations.filter(location => {
        return location.name.toLowerCase().indexOf(this.state.query) !== -1;
      });
      console.log("kāds saka meklet");
      this.setState({
        locations: searchResults
      });
      // if theres an error
      if (searchResults.error) {
        this.state({ locations: [] });
        console.log("errors meklejot");
      } else {
        this.setState({
          locations: searchResults
        });
        console.log("locations ir atrasti", this.state.locations);
      }
    } else {
      this.setState({
        locations: this.state.allLocations
      });
      console.log("neviens neko nemekle");
    }
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="sidebar">
          <h1>this is a side</h1>
          <SideBar
            markers={this.state.locations}
            selectedMarkerId={this.state.selectedMarkerId}
            onToogleOpen={this.onToogleOpen}
            onToogleClose={this.onToogleClose}
            infoIsOpen={this.state.infoIsOpen}
            updateQuery={this.updateQuery}
          />
        </div>
        <div className="col-12 mapContainer">
          <MapContainer
            markers={this.state.locations}
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
