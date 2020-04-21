import React,{Component} from 'react';
import { Card,Button } from 'react-bootstrap';
import PostDetail from '../Post/Post';
//everytime we link to somewhere we will get the some specific props

class Post extends Component{

  render(){
    console.log(this.props) //working
    return(
        <p>Details of a post </p>
     );
  }
}

export default Post;
