import React,{useState} from 'react';
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
import {UserContext} from '../src/components/Context/AuthContext';


const App = () => {

  const [newData, setNewData] = useState({
    token: null,
    userId: null,
    error: null,
    loading: false
  });

  return (
    <div>

          <Switch>
          <UserContext.Provider value={{newData,setNewData}}>
              <Navbar/>
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
