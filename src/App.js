import React,{Component} from 'react';
import './App.css';
import Navbar from './components/Navigation/Navbar';
//seting up rputing
import  {Route, Switch, Redirect} from 'react-router-dom';
import Posts from '../src/components/Posts/Posts';
import CreatePost from '../src/components/PostCreation/CreatePost';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Post from '../src/components/PostDetail/PostDetail';
import PostUpdate from '../src/components/UpdatePost/UpdatePost';
import NoMatch from '../src/components/NoMatch/NoMatch';


 class App extends Component{
  render() {
    return (
      <div>
        <Navbar/>

          <Switch>
                <Route path="/posts" component={Posts}/>
                <Route path="/createpost" component={CreatePost}/>
                <Route exact path="/post/:id" component={Post}/>
                <Route exact path="/update/post/:id" component={PostUpdate}/>
                <Route exact path="/" component={LandingPage}/>
              <Route exact path="/404" component={NoMatch}/>
            </Switch>

      </div>

    );

  }
}

export default App;
