import React,  { Component }  from "react";
import {Navbar, FormGroup, FormControl, Glyphicon, Fade } from 'react-bootstrap';
import { Link } from 'react-router-dom'
class NavBar extends Component {
  state = {
    buttonIsShown:false
  }
  // set timmeout for back button (so user cant swich Links fast - it was causing state error)
  componentDidMount(){
    this.showBackButton()
  }
  showBackButton=()=>{
    setTimeout(()=>{
      this.setState({
        buttonIsShown:true
      })
    },1500);
  }
  render(){
    return(
      <Navbar fixedTop>

        <div className="col-sm-7">
          <Fade in={this.state.buttonIsShown}>
            <Link to="/" aria-label="Back to location search"><Glyphicon glyph="home" />Back</Link>
          </Fade>

      <h3>Cafes near me </h3>

       </div>

         <Navbar.Form pullLeft>
           <FormGroup>
             <FormControl role="textbox" aria-label="Search by restaurant name"
               type="text"
               className="form-control"
               placeholder="Search by Café name"
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
