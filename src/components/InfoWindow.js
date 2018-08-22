import React,  { Component }  from "react";
import {Button, Image} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';


class InfoWindow extends Component {
  componentDidMount(){
    this.addStarRating()
  }
  addStarRating=()=>{
    const starTotal = 10
    const starprocenti = (this.props.locationDetails.rating / starTotal)*100
    const starPorcentiRounded = `${(Math.round(starprocenti / 10) * 10)}%`;
    return starPorcentiRounded
  }
  render(){
    const locationDetails=this.props.locationDetails
    const searchMarker = this.props.searchMarker
    let adrese = searchMarker.location.address ?
    searchMarker.location.address : 'No address';
    const photo = locationDetails.bestPhoto ?
    `${locationDetails.bestPhoto.prefix}width300${locationDetails.bestPhoto.suffix}` : 'noImage';
    const hours = locationDetails.hours ?
    locationDetails.hours.status : 'No available hours'
    return(
      <div id="locationInfo">
        <Button className="close" bsStyle="link" onClick={this.props.onToogleClose}>X</Button>
        <h5><Glyphicon glyph="globe" /> {adrese}, {searchMarker.location.city} </h5>
        <h5><Glyphicon glyph="time" /> {hours}</h5>
        <div className="col-sm-12"><Image src={photo} responsive rounded/></div>
        <div className="col-sm-12"><h5>Rating:</h5></div>
       <div className="stars-empty"> <div className="stars-full" style={{width: this.addStarRating()}}></div></div>
      </div>
    )
  }
}
export default InfoWindow
