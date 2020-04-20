import React from 'react';
import './App.css';
import Navbar from './components/Navigation/Navbar';
//seting up rputing
import  {Route, Switch} from 'react-router-dom';
import CreatePost from './components/PostCreation/CreatePost';
import Posts from './components/Posts/Posts';

function App() {
  return (
    <div className="App">
    <Navbar/>

       <Switch>
        <Route path="/AllPosts" component="working"/>
        <Route path="/CreatePost" component={CreatePost}/>
        <Route path="/" component="mola"/>
      </Switch>

      <div className="posts">

          <Posts/>

      </div>

    </div>

  );
}

export default App;
