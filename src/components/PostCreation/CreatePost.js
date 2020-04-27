import React,{useState} from 'react';
import {Form} from 'react-bootstrap';

function Post(props) {

  const [details, setDetails] = useState({title:"", author: "", likes: 0, category: ""});

  const handleChange = (event) => {

    const value = event.target.value;

    setDetails({
      ...details,
      [event.target.name]: value
    });

  }

   const addPost = (event) =>  {

    const {title,author,likes,category} = details;
    //not working POSt request

    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, author: author, category: category, likes: likes })
    };

    const postRequest = fetch('/posts', postDetails)
    .then(response => response.json())
    .then(data => setDetails(data))
    .catch(error => console.log(error))


    event.preventDefault();
    props.history.push('/posts')
  }


  return (
    <div>
        <Form >
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="Enter title"  />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="Enter Content"/>
         </Form.Group>
      </Form>
      <button onClick={addPost}>Add Post</button>

    </div>
  );
}


export default Post;
