import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';

function Post(props) {

  const [details, setDetails] = useState({title:"", author: ""});

  const handleChange = (event) => {

     const {title, author} = details;
    setDetails(prevDetails => {
      return {
        ...prevDetails,
        title: event.target.value //error: This synthetic event is reuse NOT WOKRING YET
      }
    })

  }

   const addPost = (event) => {
    event.preventDefault();

    const postDetails = {
      method: 'POST',
      body: JSON.stringify({
        title: details.title,
        author: details.author
      }),
      headers:  {
        "Content-type": "application/json; charset=UTF-8"
      }
    };

    const postRequest = fetch('/posts', postDetails)
    .then(response => response.json())
    .then(data => setDetails(data))
    .catch(error => console.log(error))

    props.history.push('/posts')


  }

  return (
    <div>
        <Form >
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="Enter Content" />
         </Form.Group>
      </Form>
      <button onClick={addPost}>Add Post</button>

    </div>
  );
}


export default Post;
