import React,  { Component }  from "react";
import {Navbar, FormGroup, FormControl } from 'react-bootstrap';
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
           </FormGroup>{' '}
         </Navbar.Form>

      </Navbar>
    )
  }
}
export default NavBar;
