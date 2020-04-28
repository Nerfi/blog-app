import React,{useState} from 'react';
import {Form} from 'react-bootstrap';

function Post(props) {

  const [details, setDetails] = useState({
    title:"",
   author: "",
   likes: null,
   category: ""
 });



  const handleChange = event => {

    let name = event.target.name;
    let value = event.target.value;
    setDetails(prevPosts => {
      return {
      ...prevPosts,
      [name]: value
      }
    });

  }

   const addPost = (event) =>  {

    const {title,author,likes,category} = details;

    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  title,  author,  category,  likes })
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
        <Form onSubmit={addPost}>
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} name="title"  type="text" placeholder="Enter title"  />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} name="author" type="text"  placeholder="Enter Content"/>
         </Form.Group>
      </Form>
      <button onClick={addPost}>Add Post</button>
    </div>
  );
}


export default Post;
