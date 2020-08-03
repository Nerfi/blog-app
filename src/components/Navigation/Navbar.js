import React, {useContext} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  {NavLink, Redirect} from 'react-router-dom';
import {UserContext} from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

//imporing current user in case there is
import {user} from '../../firebase/firebase';
import firebase from '../../firebase/firebase';


if (user) {
  // User is signed in.
  alert(user, 'here is the fucking user')
} else {
  alert('not user')
}

const Main = () => {

      const history = useHistory();
      const userSession = user;

      const logOut = () => {

        firebase.auth().signOut().then(function() {
      // Sign-out successful.
          alert(' Sign out done !')

        }).catch(function(error) {
          alert(error.message)
        })

    };



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
                  userSession ? <NavLink onClick={logOut} style={{marginLeft: '20px' , color: 'white'}} to="/logout">LogOut</NavLink>
                :  <NavLink style={{marginLeft: '20px' , color: 'white'}} to="/SignUp">SignUp</NavLink>
               }


              </Nav>
            </Navbar.Collapse>

          </Navbar>


        </div>

  );
};
export default Main;


