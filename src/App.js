import React, { Component } from "react";
import "./styles/app.min.css";
import * as PlacesAPI from './placesAPI'
import { Button, Modal, Alert} from 'react-bootstrap';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchResults from './components/SearchResults'
import Search from './components/Search'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      centerMap: {  lat: 56.950900, lng: 24.101161 },
      hasError: false
    }
  }

  render() {
    // search form

    return (
      <div id="root">
            <Route exact path="/" render={()=>(
              <div className="searchLocationContainer">
                Wop, wop
                <Search />
                <Link to="/restaurant-search">Hello</Link>
              </div>
            )} />
            <Route path="/restaurant-search" render={()=>(
              <SearchResults />
            )} />
      </div>

    );
  }
}
export default App;
