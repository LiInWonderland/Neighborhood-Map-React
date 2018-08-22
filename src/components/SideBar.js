import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";
import SideLocations from "./SideLocations";

class SideBar extends Component {

  render() {
    return (
      <Col xs={12} sm={5} md={4} className={this.props.isActive? 'tumss sidebar':' sidebar'}>
        <Button
          className="closebtn"
          onClick={this.props.closeSideBar}
        >
          <span className="glyphicon glyphicon-menu-left" />
        </Button>
        <div className="list">

          <h4>Search results</h4>
          <p>Found: {this.props.searchResults.length}</p>
          {this.props.searchResults.length>0 ?
            <ul className="list-group">
            {this.props.searchResults.map((searchMarker, SearchmarkerId) => (
              <SideLocations
                searchMarker={searchMarker}
                isActive = {this.props.isActive}
                selectedMarkerId = {this.props.selectedMarkerId}
                onToogleOpen={this.props.onToogleOpen}
                onToogleClose={this.props.onToogleClose}
                infoIsOpen={this.props.infoIsOpen}
                key = {searchMarker.id}
                getLocationsDetails={this.props.getLocationsDetails}
                locationDetails={this.props.locationDetails}
              />
            ))}
          </ul>
          : <h5>There's no places named <i>'{this.props.query}'</i>, please try again!</h5>}
        </div>
      </Col>
    );
  }
}
export default SideBar;
