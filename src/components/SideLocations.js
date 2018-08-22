import React, { Component } from "react";
import InfoWindow from './InfoWindow'
import {Glyphicon} from 'react-bootstrap';

class SideLocations extends Component {
  render() {
    const searchMarker = this.props.searchMarker
    return (

        <li key={searchMarker.id}  ref={c => (this.infoContent = c)}>
          <a
            className={this.props.isActive && this.props.selectedMarkerId === searchMarker.id?'listgroupItem':'list-group-item '}
            onClick={event => {
              this.props.onToogleOpen(
                event,
                searchMarker.id,
                { lat: searchMarker.location.lat, lng: searchMarker.location.lng }
              );
            }}
          >
          <h5> <Glyphicon glyph="cutlery" /> {searchMarker.name}</h5>
          </a>

            {this.props.infoIsOpen &&
              this.props.selectedMarkerId === searchMarker.id && (
                <InfoWindow
                  onToogleClose={this.props.onToogleClose}
                  searchMarker = {searchMarker}
                />

              )}

        </li>
    )
  }
}
export default SideLocations;
