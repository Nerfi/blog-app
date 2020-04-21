import React,{Component} from 'react';
import './App.css';
import Navbar from './components/Navigation/Navbar';
//seting up rputing
import  {Route, Switch} from 'react-router-dom';
import Posts from '../src/components/Posts/Posts';
import CreatePost from '../src/components/PostCreation/CreatePost';
import LandingPage from '../src/components/LandingPage/LandingPage';
import PostDetail from '../src/components/PostDetail/PostDetail';


 class App extends Component{
  render() {
    return (
      <div>
        <Navbar/>

          <Switch>
                <Route path="/posts" component={Posts}/>
                <Route path="/CreatePost" component={CreatePost}/>
                <Route exact path="/post/:id" component={PostDetail}/>
                <Route exact path="/" component={LandingPage}/>
            </Switch>

      </div>

    );

  }
}

export default App;
