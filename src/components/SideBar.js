import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { TweenMax } from "gsap/TweenMax";
import SideLocations from "./SideLocations";

class SideBar extends Component {
  // this is called at the same time as componentDidMount, for div to enter
  componentWillEnter(callback) {
    const el = this.container;
    TweenMax.fromTo(
      el,
      0.7,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, onComplete: callback }
    );
  }
// for children to be removed
  componentWillLeave(callback) {
    const el = this.container;
    TweenMax.fromTo(
      el,
      0.3,
      { x: 0, opacity: 1 },
      { x: -100, opacity: 0, onComplete: callback }
    );
  }
  render() {
    return (
      <div ref={c => (this.container = c)} className={this.props.isActive? 'tumss col-sm-3 sidebar':' col-sm-3 sidebar'}>
        <Button
          className="closebtn"
          onClick={this.props.closeSideBar}
        >
          <span className="glyphicon glyphicon-chevron-left" />
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
      </div>
    );
  }
}
export default SideBar;
