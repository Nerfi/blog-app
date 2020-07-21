import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
//importing firebase
import firebase from '../../firebase/firebase';


const UpdatePost = (props) => {

  const [error, setError] = useState(false);

  const [updatePost, setUpdatePost] = useState({
    title: "",
    author: "",
    value: ""
  });

  const [category, setCategory] = useState({value: ''});

  useEffect(() => {

    const fetchUpdatePost = () => {

      const singleDoc = firebase
      .firestore()
      .collection("posts")
      .doc(`${props.match.params.id}`)

      singleDoc
      .get()
      .then(function(doc) {

        if(doc.exists) {

          setUpdatePost(doc.data());

        } else {
            setError(!error)
        }
      }).catch(function(error) {
        console.log(error, 'the error is here')
      })

    }

    fetchUpdatePost();



  },[]);



 const handleChange = event => {

    const value = event.target.value;
    const name = event.target.name;

    setUpdatePost(prevPosts => {
      return {
      ...prevPosts,
      [name]: value

      }
    });

  }


  const updatedPostValues = async () => {

    const {author, title} = updatePost;
    const { value } =  category;

    firebase
    .firestore()
    .collection("posts")
    .doc(`${props.match.params.id}`)
    .update({
       author,
      title,
      value
    })
    .then(function() {
      props.history.push("/")
    })

  }

  const handleCategorChange = event => setCategory({value: event.target.value});


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

      <select onChange={handleCategorChange}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option  value="News">News</option>
        <option value="Tech">Tech</option>
      </select>

       <button  type="button" onClick={updatedPostValues}>Update Post</button>
      </Form>

    </div>
  );
};

export default UpdatePost;
