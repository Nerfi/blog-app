import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';

const UpdatePost = (props) => {

  const [updatePost, setUpdatePost] = useState({});

  useEffect(() => {
    fetch(`/posts/${props.match.params.id}`)
    .then(response =>  response.json())
    .then(selectPost => setUpdatePost(selectPost))
  },[]);

 const handleChange = (event) => {

    const value = event.target.value;

    setUpdatePost({
      ...updatePost,
      [event.target.name]: value
    });

  }


const updatedPost = () => {

  const {author, title, category} = updatePost;

   const postDetails = {
    method: 'PUT',
      body: JSON.stringify({
          author:author,
          title: title,
          category: category
        }),
      headers: { 'Content-Type': 'application/json' }

  };
  const updatedPostValues = fetch(`/posts/${props.match.params.id}`, postDetails)
  .then(response =>  response.json())
  .then(updateDate => setUpdatePost(updateDate))
  .catch(err => alert(err));

};


  return(
    <div>
     <Form >
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} type="text" placeholder="Enter title" value={updatePost.title} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="Enter Content"  value={updatePost.author}/>
         </Form.Group>
      </Form>
      <button onClick={updatedPost}>Update Post</button>

      <div>
        <input type="text" onChange={handleChange}  />
         <input type="text" onChange={handleChange} />
         <button onClick={updatedPost}>Update Post</button>

      </div>

    </div>
  );
};

export default UpdatePost;
