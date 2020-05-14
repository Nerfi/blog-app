import React, {useContext} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  {NavLink, Redirect} from 'react-router-dom';
import {UserContext} from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

function logOut () {
  const history = useHistory();
  setNewData({token: null,useId: null })
  history.push("/")
};


const Main = () => {
 // const history = useHistory();
  //console.log(history, 'props from withRouter are here hopefully ')


    const {newData, setNewData} = useContext(UserContext);
    // not sure why this works with Pascal and not with lowerSnakeCase

    //const logOut = () => {

      //const history = useHistory();

      //setNewData({null}) // I have to clean out the last state , all the data now will be null after logOut

      //return history.push("/");
    //}

    const  history = useHistory();

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
                  newData.token ? <NavLink onClick={logOut} style={{marginLeft: '20px' , color: 'white'}} to="/logout">LogOut</NavLink>
                :  <NavLink style={{marginLeft: '20px' , color: 'white'}} to="/SignUp">SignUp</NavLink>
               }


              </Nav>
            </Navbar.Collapse>

          </Navbar>


        </div>

  );
};
export default Main;


