import React, { Component } from "react";

class SideBar extends Component {
  state = {
    hasError: false,
    searchSomething: false
  };
  render() {
    return (
      <div className="list">
        <input
          type="text"
          className="form-control"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}
        />
        <h4>Search results</h4>
        <ul className="list-group">
          {this.props.markers.map((searchMarker, SearchmarkerId) => (
              <a key={searchMarker.id}>
                <li
                  className="list-group-item"
                  onClick={event => {
                    this.props.onToogleOpen(
                      event,{lat: searchMarker.location.lat, lng: searchMarker.location.lng},
                      { markerId: searchMarker.id}
                    );
                  }}
                >
                  {searchMarker.name}
                  {this.props.infoIsOpen &&
                    this.props.selectedMarkerId === searchMarker.id && (
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
