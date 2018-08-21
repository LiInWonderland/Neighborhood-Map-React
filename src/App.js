import React, { Component } from "react";
//import logo from './logo.svg';
import "./styles/app.min.css";
import SideBar from "./components/SideBar";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapContainer from "./components/map";
import placesInRiga from "./placesJSON";
import { Button } from 'react-bootstrap';
import { TransitionGroup } from 'react-transition-group';

class NeighborhoodApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      locations: placesInRiga,
      allLocations:placesInRiga,
      defaultCenter: {  lat: 56.948013, lng: 24.079009 },
      selectedMarkerId: -1,
      selectedLocationId:-1,
      infoIsOpen: false,
      query: "",
      showSideBar:true,
      searchResults:null,
      isActive: false
    }
    this.openSideBar = this.openSideBar.bind(this)
    this.closeSideBar = this.closeSideBar.bind(this)
    //this.closeSideBar = this.closeSideBar.bind(this)
  }
  onToogleOpen = (event, markerId) => {
    console.log('markerid: ',markerId.markerId)
    this.setState({
      infoIsOpen: true,
      selectedMarkerId: markerId.markerId,
      isActive: true
    });
    //this.changeMapCenter()
    console.log('Selected marker id: ',this.state.selectedMarkerId)
  };
  onToogleClose=()=>{
    console.log('infowindow need to be closed')
    this.setState({
      infoIsOpen: false,
      selectedMarkerId: -1,
      isActive: false
    });
    console.log('infowindow is closed')
  }
  updateQuery = query => {
    this.setState({ query: query });
    this.controlLocations(query);
  };
  controlLocations = (searchResults, query) => {
      if (query) {
        this.setState({
          locations: searchResults
        });
      } else {
        this.setState({ locations: this.state.allLocations });
      }
  };
  closeSideBar(){
    console.log('The link was clicked -close.');
    this.setState({ showSideBar: false });
  }
  openSideBar(){
    console.log('The link was clicked - open.');
    this.setState({ showSideBar: true });
  }
  render() {
    const searchResults = this.state.locations.filter(location => {
      return location.name.toLowerCase().indexOf(this.state.query) !== -1;
    });
    return (
      <div className="container-fluid">
        <TransitionGroup>
          {this.state.showSideBar &&(

                <SideBar
                  searchResults={searchResults}
                  selectedMarkerId={this.state.selectedMarkerId}
                  onToogleOpen={this.onToogleOpen}
                  onToogleClose={this.onToogleClose}
                  infoIsOpen={this.state.infoIsOpen}
                  updateQuery={this.updateQuery}
                  closeSideBar={this.closeSideBar}
                  isActive = {this.state.isActive}
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
            defaultCenter={this.state.defaultCenter}
            infoIsOpen={this.state.infoIsOpen}
          />
        </div>
      </div>
    );
  }
}
export default NeighborhoodApp;
