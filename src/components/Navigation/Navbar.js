import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
//we use NavLink because we want to give some style to the Links, otherwise we will just use Link

const toolbar = (props) => (

  <div className="toolbar">
   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
       <NavLink style={{color: 'white'}} to="/">Posts App</NavLink>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
         <NavLink exact style={{color: 'white', marginRight: '50px'}} to="/CreatePost">CreatePost</NavLink>
        <NavLink  style={{color: 'white'}} to="/AllPosts">All Posts</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  </div>

);


export default toolbar;
