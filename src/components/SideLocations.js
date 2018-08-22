import React, { Component } from "react";
import InfoWindow from './InfoWindow'
import {Glyphicon} from 'react-bootstrap';

class SideLocations extends Component {
  render() {
    const searchMarker = this.props.searchMarker
    return (

        <li key={searchMarker.id}  ref={c => (this.infoContent = c)} id={searchMarker.id}
          className={this.props.isActive && this.props.selectedMarkerId === searchMarker.id?'listgroupItem info':'list-group-item info'}
        >
          <a
            onClick={event => {
              this.props.onToogleOpen(
                event,
                searchMarker.id,
                { lat: searchMarker.location.lat, lng: searchMarker.location.lng }
              );
            }}
          >
          <div className="nosaukums"><div className="col-sm-1"> <Glyphicon glyph="cutlery" /></div><div className="col-sm-11"><h4>{searchMarker.name}</h4></div></div>
          </a>

            {this.props.infoIsOpen &&
              this.props.selectedMarkerId === searchMarker.id && (
                <InfoWindow
                  onToogleClose={this.props.onToogleClose}
                  searchMarker = {searchMarker}
                  locationDetails={this.props.locationDetails}
                />

              )}

        </li>
    )
  }
}
export default SideLocations;
