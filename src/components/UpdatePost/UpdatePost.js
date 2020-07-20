import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
//importing firebase
import firebase from '../../firebase/firebase';


const UpdatePost = (props) => {

  const [updatePost, setUpdatePost] = useState({
    title: "",
    author: "",
    category: ""
  });

  //probablemente necesito reescribir este hook, completamente with firestore methods.
  useEffect(() => {

    async function fetchSinglePost () {

      const fetchPost = await fetch(`https://blog-fa351.firebaseio.com/posts/${props.match.params.id}.json`);
      const response = await fetchPost.json();
      setUpdatePost(response);
    };

    fetchSinglePost();

  },[]);

  useEffect(() => {

    const getSingleDoc = () => {
      firebase
      firestore()
    }


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

  //Re-writing with firestore docs


}


  return(
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '15vh'}}>
     <Form >
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} name="title" type="text" placeholder="Enter title" value={updatePost.title} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} name="author" type="text" placeholder="Enter Content"  value={updatePost.author}/>
         </Form.Group>
       <button  type="button" onClick={updatedPost}>Update Post</button>
      </Form>

    </div>
  );
};

export default UpdatePost;
