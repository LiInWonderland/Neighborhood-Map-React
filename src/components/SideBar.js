import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { TweenMax } from "gsap/TweenMax";
class SideBar extends Component {
  state = {
    hasError: false,
    searchSomething: false
  };
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
        <h2>Restaurant search</h2>
        <Button
          bsStyle="info"
          className="closebtn"
          onClick={this.props.closeSideBar}
        >
          <span className="glyphicon glyphicon-chevron-left" />
        </Button>
        <div className="list">
          <input
            type="text"
            className="form-control"
            placeholder="Search by restaurant name"
            value={this.props.query}
            onChange={event => this.props.updateQuery(event.target.value)}
          />
          <h4>Search results</h4>
          <p>Found: {this.props.searchResults.length}</p>
          <ul className="list-group">
            {this.props.searchResults.map((searchMarker, SearchmarkerId) => (
              <a key={searchMarker.id}>
                <li
                  ref="element"
                  className={this.props.isActive && this.props.selectedMarkerId === searchMarker.id?'list-group-item active':'list-group-item '}
                  onClick={event => {
                    this.props.onToogleOpen(
                      event,
                      { markerId: searchMarker.id }
                    );
                  }}
                >
                  {searchMarker.name}
                  {this.props.infoIsOpen &&
                    this.props.selectedMarkerId === searchMarker.id && (
                      <div id="locationInfo">
                        <p>INFOO</p>
                      </div>
                    )}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default SideBar;
