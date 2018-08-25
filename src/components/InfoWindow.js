import React,  { Component }  from "react";
import {Button, Image} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';


class InfoWindow extends Component {
  componentDidMount(){
    this.addStarRating()
    this.getRestaurantCategories()
  }
// add stars for Restaurant rating
  addStarRating=()=>{
    const starTotal = 10
    const starprocenti = (this.props.locationDetails.rating / starTotal)*100
    const starPorcentiRounded = `${(Math.round(starprocenti / 10) * 10)}%`;
    return starPorcentiRounded
  }
// get current Restaurant categorie
  getRestaurantCategories=()=>{
    this.props.searchMarker.categories.map(categorie=>{
      return console.log(categorie.name)
    })
  }
  render(){
    const locationDetails=this.props.locationDetails
    const searchMarker = this.props.searchMarker
  // if array has no address, photo, working hours or restaurant categorie of current Restaurant - show the message
    let adrese = searchMarker.location.address ?
    searchMarker.location.address : 'No address';
    const photo = locationDetails.bestPhoto ?
    `${locationDetails.bestPhoto.prefix}width300${locationDetails.bestPhoto.suffix}` : 'No available image';
    const hours = locationDetails.hours ?
    locationDetails.hours.status : 'No available hours'
    const restaurantCategorie = searchMarker.categories.map(categorie=>{
        return categorie.name?
        categorie.name: 'No Categorie'
    })

    return(
      <div id="locationInfo" role="Listitem">
        <h5 tabIndex="0"><Glyphicon glyph="paperclip" /> <i>{restaurantCategorie}</i></h5>
        <h5 tabIndex="0"><Glyphicon glyph="globe" /> {adrese}, {searchMarker.location.city} </h5>
        <h5 tabIndex="0"><Glyphicon glyph="time" /> {hours}</h5>
        <p></p>
        <div className="col-sm-12" tabIndex="0"><Image src={photo} alt={searchMarker.name} responsive rounded/></div>
        <div className="col-sm-12" tabIndex="0"><h5>Rating:</h5></div>
       <div className="stars-empty"> <div className="stars-full" style={{width: this.addStarRating()}}></div></div>
         <Button className="close" aria-label="Exit details" bsStyle="link" tabIndex="0" onClick={this.props.onToogleClose}>Close</Button>
      </div>
    )
  }
}
export default InfoWindow
