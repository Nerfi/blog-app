import React,{Component} from 'react';
import {Form} from 'react-bootstrap';
//este es elq ue va a tener todo el estado app component solo va a renderizar los post y ya esta
class Post extends Component {

  handleChange = (e) => {
    console.log(e.target.value);
  }


  render(){

     return(
      <div>
        <Form onSubmit={""}>
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={this.handleChange} type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={this.handleChange} type="text" placeholder="Enter Content" />
         </Form.Group>
      </Form>

    </div>

    );
  }


}

export default Post;



