import React, { Component } from "react";
import * as PlacesAPI from '../placesAPI'
import { Button, Modal, Alert} from 'react-bootstrap';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      centerMap: {  lat: 56.950900, lng: 24.101161 },
      hasError: false
    }
  }
  render(){
    return(
      <div className="container-fluid">
      </div>
    )
  }
}
export default Search;
