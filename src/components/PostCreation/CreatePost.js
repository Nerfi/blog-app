import React,{Component} from 'react';
import {Form} from 'react-bootstrap';
//este es elq ue va a tener todo el estado app component solo va a renderizar los post y ya esta
class Post extends Component {

  state = {
    title: '',
    body: ''
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
      body: e.target.value
    });
  }

  onSubmit = (e) => {
      e.preventDefault();

      fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  }



  render(){
  console.log(this.state.title, this.state.body, 'title and boyd is here')

     return(
      <div>
        <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={this.handleChange} type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={this.handleChange} type="text" placeholder="Enter Content" />
         </Form.Group>
         <button>Submit</button>
      </Form>

    </div>

    );
  }


}

export default Post;



