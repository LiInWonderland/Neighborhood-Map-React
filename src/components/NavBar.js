import React,  { Component }  from "react";
import {Navbar, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom'
class NavBar extends Component {

  render(){
    return(
      <Navbar fixedTop>
        <Navbar.Form pullLeft>

          <Button bsStyle="link"><Link to="/"><Glyphicon glyph="home" /> Change location</Link></Button>
        </Navbar.Form>
        <Navbar.Header>
          <h3>Restaurant search</h3>
        </Navbar.Header>

         <Navbar.Form pullLeft>
           <FormGroup>
             <FormControl
               type="text"
               className="form-control"
               placeholder="Search by restaurant categorie"
               value={this.props.query}
               onChange={event => this.props.updateQuery(event.target.value)}
            />

           </FormGroup>{' '}
         </Navbar.Form>

      </Navbar>
    )
  }
}
export default NavBar;
