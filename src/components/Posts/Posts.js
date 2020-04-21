import React, {Component} from 'react';
import Post from '../Post/Post';


class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => this.setState({posts: json}))

  };

  handlesubmit = (blogPost) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => this.setState(prevstate => {
    return [...prevstate, blogPost];
  }))
  };


  render(){
    return (
        <div>
         {this.state.posts.map(post => {
            return(
              <Post title={post.title} body={post.body} key={post.id} id={post.id}/>
              );

          })}
        </div>

      );
    }
  }


export default Posts;
