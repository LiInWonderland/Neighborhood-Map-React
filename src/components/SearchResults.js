import React, { Component } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import MapContainer from "./map";
import * as PlacesAPI from '../placesAPI'
import { Button } from 'react-bootstrap';
import { TransitionGroup } from 'react-transition-group';

class SearchResults extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedMarkerId: -1,
      infoIsOpen: false,
      query: "",
      showSideBar:true,
      searchResults:null,
      isActive: false,
      locations: [],
      allLocations:[],
      locationDetails:[],
      centerMap: {  lat: 56.950900, lng: 24.101161 },
      hasError: false
    }
    this.openSideBar = this.openSideBar.bind(this)
    this.closeSideBar = this.closeSideBar.bind(this)
    this.onToogleOpen = this.onToogleOpen.bind(this)
  }
  // load foursquare locations
  componentWillMount() {
    this.getPlacesLocation()
    console.log(this.state.centerMap)
  }
  // get location from selected place in search (placeLatLng) if nedarbojas!!!!
    getPlacesLocation=()=>{
      if(this.props.placeLatLng ===  undefined || this.props.placeLatLng.length === 0){
          alert('Select location')
      }else{
        console.log('location exists')
        this.setState({
          centerMap:{lat: this.props.placeLatLng.lat, lng:this.props.placeLatLng.lng }
        })
        console.log('location exists')
        this.getMarkers(this.props.placeLatLng.lat, this.props.placeLatLng.lng)

      }
    }
    // get markers for current place location
    getMarkers=(locationLat, locationLng)=>{
      console.log(locationLat, locationLng)
      PlacesAPI.getPlaces(locationLat, locationLng).then((locations)=>{
        this.setState({locations: locations,
        allLocations:locations})
      }).catch((error) => {
        alert('Error while getting Locations data from FourSquare API. Locations will not be displayed or loaded')
        console.log('Error While Getting Locations from FourSquare API')
      })
    }
    // open infoWindow, select marker which is clicked and add active class to selected sidebar lcoation
    // when marker or side location is clicked
    onToogleOpen (event, markerId, latlng) {
      this.getLocationsDetails(markerId)
      console.log('markerid: ',markerId)
      this.setState({
        selectedMarkerId: markerId,
        infoIsOpen: true,
        isActive: true,
        centerMap: latlng,
      });
      console.log('Selected marker id: ',this.state.selectedMarkerId)
    };
    // load foursquare location details when marker or location on side is clicked
    getLocationsDetails=(location)=>{
      PlacesAPI.getPlacesDetails(location).then((data) =>{
        this.setState({
          locationDetails: data
        })
      })
      .catch(error =>{
        alert('Error while getting Restaurant details data from FourSquare API. Details will not be displayed or loaded')
      })
    }
    // close infoWindow, reset selected marker to default and remove active class on sidebaf location
    onToogleClose=()=>{
      this.setState({
        infoIsOpen: false,
        selectedMarkerId: -1,
        isActive: false,
        locationDetails: []
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
          })
        }else {
          this.setState({ locations: this.state.allLocations });
        }
    };
    // close sidebar when button is clicked
    closeSideBar(){
      console.log('The link was clicked -close.');
      this.setState({ showSideBar: false
       });
    }
    // open sidebar when button is clicked
    openSideBar(){
      console.log('The link was clicked - open.');
      this.setState({ showSideBar: true });
    }
  render(){
    // search form, ofcourse - could be better
    const searchResults = this.state.locations.filter(categorie => {
      return categorie.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
    });
    return(
      <div className="container-fluid">

          <NavBar
            updateQuery={this.updateQuery}
            location={this.state.centerMap}
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
                    locationDetails={this.state.locationDetails}
                  />

            )}
            </TransitionGroup>

          {!this.state.showSideBar &&(
            <div className="openbtn">
              <Button bsStyle="info" className="openbtn" onClick={this.openSideBar} ><span className="glyphicon glyphicon-menu-right"></span></Button>
              <a href="#select" className="skip">Skip map container</a>
          </div>
          )}
          <div className="mapContainer" role="application" aria-hidden="true" aria-describedby="info">
            <p hidden id="info">Application is a map that shows the restaurant location</p>
            <MapContainer
              searchResults={searchResults}
              selectedMarkerId={this.state.selectedMarkerId}
              onToogleOpen={this.onToogleOpen}
              onToogleClose={this.onToogleClose}
              centerMap={this.state.centerMap}
              infoIsOpen={this.state.infoIsOpen}
              locationDetails={this.state.locationDetails}
              openSideBar={this.openSideBar}
              showSideBar={this.state.showSideBar}
            />
          </div>


      </div>
    );
  }
}
export default SearchResults
