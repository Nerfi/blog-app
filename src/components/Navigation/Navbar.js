import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  {NavLink} from 'react-router-dom';
//we use NavLink because we want to give some style to the Links, otherwise we will just use Link


class Main extends Component {
  render() {
    return (
    <div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavLink style={{color: 'white'}} to="/">Blog</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink  style={{marginLeft: '20px', color: 'white'}} to="/posts">Posts</NavLink>
          <NavLink style={{marginLeft: '20px' , color: 'white'}} to="/CreatePost">CreatePost</NavLink>


          </Nav>
        </Navbar.Collapse>

      </Navbar>


        </div>
    );
  }
}

export default Main;
