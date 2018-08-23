import React,  { Component }  from "react";
import {Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
class NavBar extends Component {
  render(){
    return(
      <Navbar fixedTop>

        <Navbar.Header>
          <h3>Restaurant search</h3>
        </Navbar.Header>

         <Navbar.Form pullLeft>
           <FormGroup>
             <FormControl
               type="text"
               className="form-control"
               placeholder="Search by restaurant name"
               value={this.props.query}
               onChange={event => this.props.updateQuery(event.target.value)}
            />
            <Button><Link to="/">Change location</Link></Button>

           </FormGroup>{' '}
         </Navbar.Form>

      </Navbar>
    )
  }
}
export default NavBar;
