import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { TweenMax } from "gsap/TweenMax";
import SideLocations from "./SideLocations";

class SideBar extends Component {
  componentWillEnter(callback) {
    const el = this.container;
    TweenMax.fromTo(
      el,
      0.7,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, onComplete: callback }
    );
    TweenMax.fromTo(
      this.props.searchResults,
      0.5,
      { y: 0, opacity: 0 },
      { y: 200, opacity: 1, callback }
    );
  }

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
      <div className="col-sm-3 sidebar" ref={c => (this.container = c)}>
        <Button
          className="closebtn"
          onClick={this.props.closeSideBar}
        >
          <span className="glyphicon glyphicon-chevron-left" />
        </Button>
        <div className="list">

          <h4>Search results</h4>
          <p>Found: {this.props.searchResults.length}</p>
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
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default SideBar;
