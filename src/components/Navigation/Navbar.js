import React, {Component,useContext} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  {NavLink} from 'react-router-dom';
import {UserContext} from '../Context/AuthContext';

const Main = () => {

    const {newData, setNewData} = useContext(UserContext);

  return(
       <div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavLink style={{color: 'white'}} to="/">Blog</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink  style={{marginLeft: '20px', color: 'white'}} to="/posts">Posts</NavLink>
            <NavLink style={{marginLeft: '20px' , color: 'white'}} to="/CreatePost">CreatePost</NavLink>
            <NavLink style={{marginLeft: '20px' , color: 'white'}} to="/SignUp">SignUp</NavLink>

          </Nav>
        </Navbar.Collapse>

      </Navbar>


        </div>

  );
};
export default Main;


