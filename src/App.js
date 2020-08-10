import React,{useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navigation/Navbar';
import  {Route, Switch} from 'react-router-dom';
import Posts from '../src/components/Posts/Posts';
import CreatePost from '../src/components/PostCreation/CreatePost';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Post from '../src/components/PostDetail/PostDetail';
import PostUpdate from '../src/components/UpdatePost/UpdatePost';
import NoMatch from '../src/components/NoMatch/NoMatch';
import Auth from '../src/components/Auth/Auth';
import SignUp from '../src/components/Auth/SignUp';
//importing the Context hook
import {UserSessionContext} from '../src/components/Context/AuthContext';

//importing firebase, not working, failling to import, chech that out later
import firebase from './firebase/firebase';



const App = () => {

//NEW TRY WITH ARTICLE ONLINE

/*reating the initial state of the user
we create the state in the parent componetn of the consumer, 'cause this way we will not
re-render the children components in case we change/update the state
https://dev.to/emeka/usecontext-a-good-reason-to-drop-redux-216l */

const [auth, setAuth] = useState({
  loggedIn: false,
  user: {} //user is initialized as an empty object
})

// new useEffect hook in order to take the state of auth and leave here in case I need it somewhere else in the app

useEffect(() => {

  const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {

    if(authUser) {

      setAuth({loggedIn: true, user: authUser});

    } else {
     //setAuth(null) //no user
     alert('not user and not working ')
    }

  })
//calling the function
  unsubscribe();


},[]);





//useEffect(() => {
  //even when we refresh the page the user will still logged in!
  //const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
    //  if(authUser) {
        //the is a user, is logged in
      //  dispatch({

        //  type: "SET_USER",
          //user: authUser

        //})

      //} else {
        //the user is logged out
        //dispatch({
         //type: "SET_USER",
          //user: null

        //})
      //}

    //})

  //cleaning up, make sure to re-read what is this about again
  //return () => {
    //any clean up goes here
    //unsubscribe();
  //}

//},[]);



  return (
    <div>

          <Switch>
          <UserSessionContext.Provider value={auth}>
              <Navbar/>
                <Route path="/posts" component={Posts}/>
                 <Route path="/createpost" component={CreatePost}/>
                <Route  path="/post/:id" component={Post}/>
                <Route exact path="/update/post/:id" component={PostUpdate}/>
                <Route exact path="/404" component={NoMatch}/>
                <Route exact path="/Login" component={SignUp}/>
                <Route exact path="/SignUp" component={Auth}/>
                <Route exact path="/" component={LandingPage}/>
            </UserSessionContext.Provider>
                <Route component={NoMatch}/>

            </Switch>

      </div>

  );
}

export default App;
