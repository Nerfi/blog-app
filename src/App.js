import React,{Component, useState} from 'react';
import './App.css';
import Navbar from './components/Navigation/Navbar';
import  {Route, Switch, Redirect} from 'react-router-dom';
import Posts from '../src/components/Posts/Posts';
import CreatePost from '../src/components/PostCreation/CreatePost';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Post from '../src/components/PostDetail/PostDetail';
import PostUpdate from '../src/components/UpdatePost/UpdatePost';
import NoMatch from '../src/components/NoMatch/NoMatch';
//autho here is the login page
import Auth from '../src/components/Auth/Auth';
import SignUp from '../src/components/Auth/SignUp';
//importing the Context hook
import {UserContext} from '../src/components/Context/AuthContext';


const App = () => {
   //we can use useState here to write the value we pass to the provider
    const [userData, setUserData] = useState({
    token: null,
    userId: null,
    error: null,
    loading: false
  });


  return (
    <div>
        <Navbar/>


          <Switch>
          <UserContext.Provider value='jello from the PROVIDER'>
                <Route path="/posts" component={Posts}/>
                 <Route path="/createpost" component={CreatePost}/>
                <Route  path="/post/:id" component={Post}/>
                <Route exact path="/update/post/:id" component={PostUpdate}/>
                <Route exact path="/404" component={NoMatch}/>
                <Route exact path="/Login" component={SignUp}/>
                <Route exact path="/SignUp" component={Auth}/>
                <Route exact path="/" component={LandingPage}/>
            </UserContext.Provider>
                <Route component={NoMatch}/>

            </Switch>

      </div>

  );
}

export default App;
