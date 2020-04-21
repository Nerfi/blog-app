import React,{Component} from 'react';
import './App.css';
import Navbar from './components/Navigation/Navbar';
//seting up rputing
import  {Route, Switch} from 'react-router-dom';
import CreatePost from './components/PostCreation/CreatePost';
import Posts from './components/Posts/Posts';

 class App extends Component{
  state = {
    posts: []
  }
  render() {
    return (
      <div className="App">
      <Navbar/>


        <div className="posts">

            <Posts/>

        </div>

         <Switch>
          <Route path="/" exact component=""/>
          <Route path="/AllPosts" exact component={Posts}/>
          <Route path="/CreatePost" exact component={CreatePost}/>
        </Switch>

      </div>

    );

  }
}

export default App;
