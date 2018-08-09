import React, { Component } from "react";

class SideBar extends Component {
  state = {
    query: "",
    hasError: false,
    searchSomething: false,
    searchedLocations: []
  };

  updateQuery = query => {
    this.setState({ query: query });
    this.getSearchedLocations(query);
    //this.props.controlLocations(this.state.searchedLocations, query);
  };
  getSearchedLocations = query => {

    if (query) {
      const searchResults = this.props.markers.filter(marker => {
        return marker.name.toLowerCase().indexOf(this.state.query) !== -1;
      });
      console.log("kāds saka meklet");
      this.setState({
        searchedLocations: searchResults
      });
      // if theres an error
      if (this.state.searchedLocations.error) {
        this.state({ searchedLocations: [] });
        console.log("errors meklejot");
      } else {
        this.setState({
          searchedLocations: searchResults
        });
        console.log("locations ir atrasti");
      }
    } else {
      this.setState({
        searchedLocations: this.props.markers
      });
      console.log("neviens neko nemekle");
    }
  };

  render() {
    let searchResults = this.state.searchedLocations;

    return (
      <div className="list">
        <input
          type="text"
          className="form-control"
          value={this.state.query}
          onChange={event => this.updateQuery(event.target.value)}
        />
        <h4>Search results</h4>
        <ul className="list-group">

          {searchResults.map((marker, markerId) => (
              <a key={marker.id}>
                <li
                  className="list-group-item"
                  onClick={event => {
                    this.props.onToogleOpen(
                      event,
                      { lat: marker.location.lat, lng: marker.location.lng },
                      { markerId }
                    );
                  }}
                >
                  {marker.name}
                  {this.props.infoIsOpen &&
                    this.props.selectedMarkerId === markerId && (
                      <div className="locationInfo">
                        <p>INFOO</p>
                      </div>
                    )}
                </li>
              </a>
            ))
          }
        </ul>
      </div>
    );
  }
}
export default SideBar;
