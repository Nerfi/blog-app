import React,{Component} from 'react';
import './App.css';
import Navbar from './components/Navigation/Navbar';
//seting up rputing
import  {Route, Switch} from 'react-router-dom';
import Posts from '../src/components/Posts/Posts';
import CreatePost from '../src/components/PostCreation/CreatePost';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Post from '../src/components/PostDetail/PostDetail';


 class App extends Component{
  render() {
    return (
      <div>
        <Navbar/>

          <Switch>
                <Route path="/posts" component={Posts}/>
                <Route path="/createpost" component={CreatePost}/>
                <Route exact path="/post/:id" component={Post}/>
                <Route exact path="/" component={LandingPage}/>
            </Switch>

      </div>

    );

  }
}

export default App;
