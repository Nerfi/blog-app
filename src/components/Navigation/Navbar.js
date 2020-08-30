import React, {useContext, useState} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  {NavLink,useHistory} from 'react-router-dom';
import {AuthContext } from '../../../src/components/Context/AuthContext';
import firebase from '../../firebase/firebase';
import ModalAlert from '../../UI/Modal/Modal';


const Main = () => {

   const [display, setDisplay] = useState(false);

   //adding a closing button in order to close the modal
   const handleClose = () => setDisplay(false);

      const history = useHistory();

      const logOut = () => {


        firebase.auth().signOut().then(function() {
      // Sign-out successful.
          history.push("/")

          setDisplay(true);


        }).catch(function(error) {
          alert(error.message)
        })

        setDisplay(false);

    };


  const { currentUser } = useContext(AuthContext);

  if(display) return  <ModalAlert changeState={handleClose} />


  return(
       <div className="navBar_theme">

          <Navbar className="navBar_component"  collapseOnSelect expand="lg" bg="dark" variant="dark">
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


