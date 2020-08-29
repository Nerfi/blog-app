import React, {useContext} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  {NavLink,useHistory} from 'react-router-dom';
import {AuthContext } from '../../../src/components/Context/AuthContext';
import firebase from '../../firebase/firebase';

const Main = () => {

      const history = useHistory();


      const logOut = () => {

        firebase.auth().signOut().then(function() {
      // Sign-out successful.
          alert('Sign out done !')
          history.push("/")

        }).catch(function(error) {
          alert(error.message)
        })

    };

  const { currentUser } = useContext(AuthContext);

  return(
       <div>

          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavLink style={{color: 'white'}} to="/">Blog</NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavLink  style={{marginLeft: '20px', color: 'white'}} to="/posts">Posts</NavLink>
                <NavLink style={{marginLeft: '20px' , color: 'white'}} to="/CreatePost">CreatePost</NavLink>
                {
                  currentUser ? <NavLink onClick={logOut} style={{marginLeft: '20px' , color: 'white'}} to="/logout">LogOut</NavLink>
                :  <NavLink style={{marginLeft: '20px' , color: 'white'}} to="/SignUp">SignUp</NavLink>
               }


              </Nav>
            </Navbar.Collapse>

          </Navbar>


        </div>

  );
};
export default Main;


