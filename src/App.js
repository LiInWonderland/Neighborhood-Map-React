import React, { Component } from "react";
//import logo from './logo.svg';
import "./styles/app.min.css";
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapContainer from "./components/map";

class NeighborhoodApp extends React.Component {
  render() {
    return (
      <div className="container-fluid">

          <div className="col-sm-3 sidebar">
            <h1>this is a side</h1>
          </div>
          <div className="col-sm-9 mapContainer">
            <MapContainer/>
          </div>

      </div>

    );
  }
}
export default NeighborhoodApp;
