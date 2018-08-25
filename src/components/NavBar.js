import React,  { Component }  from "react";
import {Navbar, FormGroup, FormControl, Glyphicon, Fade } from 'react-bootstrap';
import { Link } from 'react-router-dom'
class NavBar extends Component {
  state = {
    buttonIsShown:false
  }
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

      <h3>Restaurant search</h3>

       </div>

         <Navbar.Form pullLeft>
           <FormGroup>
             <FormControl role="textbox" aria-label="Search by restaurant name"
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
