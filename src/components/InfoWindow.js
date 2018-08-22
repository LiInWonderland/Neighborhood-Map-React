import React,  { Component }  from "react";
import {Button, Image} from 'react-bootstrap';
import * as PlacesAPI from '../placesAPI'


class InfoWindow extends Component {
  componentDidMount(){
    this.addStarRating()
  }
  addStarRating=()=>{
    const starTotal = 5
    const starprocenti = (this.props.searchMarker.rating / starTotal)*100
    const starPorcentiRounded = `${(Math.round(starprocenti / 10) * 10)}%`;
    return starPorcentiRounded
  }
  getLocationsDetails=(location)=>{
    PlacesAPI.getPlacesDetails(location.markerId).then((data) =>{
      const place = data.response.venue;
      return place
    })
    console.log(location)
  }
  render(){
    const searchMarker = this.props.searchMarker
    return(
      <div id="locationInfo">
        <Button className="close" bsStyle="link" onClick={this.props.onToogleClose}>X</Button>
        <p>{searchMarker.location.crossStreet},{searchMarker.location.city} </p>
        <p><Image src="/thumbnail.png" responsive /></p>
        <p>Rating:</p> <div className="stars-empty"> <div className="stars-full" style={{width: this.addStarRating()}}></div></div>
      </div>
    )
  }
}
export default InfoWindow
