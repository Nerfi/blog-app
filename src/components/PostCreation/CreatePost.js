import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
//create a fuctional component
//handle the submit of a post object, with title and body
function Post() {
  const [details, setDetails] = useState({title:"", author: ""});


  const handleChange = (event) => {
     const {title, author} = details;
     console.log(details);

    setDetails(prevDetails => {
      return {
        ...prevDetails,
        title: event.target.value //error: This synthetic event is reuse
      }
    })

  }

  const addPost = () => {
    fetch('/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: details.title,
        body: details.author
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  }
  return (
    <div>
        <Form onSubmit={addPost}>
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="Enter title"/>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="Enter Content" />
         </Form.Group>
         <button>Submit</button>
      </Form>

    </div>
  );
}


export default Post;
