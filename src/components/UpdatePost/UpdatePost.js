import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';

const UpdatePost = (props) => {

  const [updatePost, setUpdatePost] = useState({
    title: "",
    author: "",
    category: ""
  });


  useEffect(() => {
    async function fetchSinglePost () {
      const fetchPost = await fetch(`https://blog-fa351.firebaseio.com/posts/${props.match.params.id}.json`);
      const response = await fetchPost.json();
      setUpdatePost(response);
    };

    fetchSinglePost();
  },[]);

 const handleChange = event => {

    const value = event.target.value;
    const name = event.target.name;

    setUpdatePost({
      ...updatePost,
      [name]: value
    });

  }

const updatedPost = async () => {

  const {author, title, category, likes} = updatePost;

    const postDetails = {
    method: 'PUT',
      body: JSON.stringify({
          author: author,
          title: title,
          category: category,
          likes: likes
        }),
      headers: { 'Content-Type': 'application/json' }

  };

  const updatedPostValues =  await fetch(`https://blog-fa351.firebaseio.com/posts/${props.match.params.id}.json`, postDetails);
  const response = await updatedPostValues.json();
  setUpdatePost(response);
  props.history.push('/posts');

}


  return(
    <div>
     <Form >
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} name="title" type="text" placeholder="Enter title" value={updatePost.title} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} name="author" type="text" placeholder="Enter Content"  value={updatePost.author}/>
         </Form.Group>
      </Form>
      <button onClick={updatedPost}>Update Post</button>

    </div>
  );
};

export default UpdatePost;
