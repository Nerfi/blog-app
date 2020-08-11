import React,{useState, useEffect} from 'react';
import {Form} from 'react-bootstrap';
//importing firebase
import firebase from '../../firebase/firebase';


const UpdatePost = (props) => {

  const [error, setError] = useState(false);

  const [category, setCategory] = useState({value: ''});

  const [updatePost, setUpdatePost] = useState({
    title: "",
    author: "",
    value: ""
  });


  useEffect(() => {

    const fetchUpdatePost = () => {

      const singleDoc = firebase
      .firestore()
      .collection("posts")
      .doc(props.match.params.id)

      singleDoc
      .get()
      .then(function(doc) {

        if(doc.exists) {

          setUpdatePost(doc.data());

        } else {
            setError(true);
        }
      }).catch(function(error) {
        console.log(error, 'the error is here')
      })

    }

    fetchUpdatePost();



  },[updatePost]);



 const handleChange = event => {

    let value = event.target.value;
    let name = event.target.name;

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
    }).catch(e => {
      console.log(e.message)
    })

  }

  const handleCategoryChange = event => setCategory({value: event.target.value});

  const {title, author} = updatePost;


  return(
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '15vh'}}>
     <Form >
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control  name="title" type="text" placeholder="Enter title" onChange={handleChange} value={title} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label >Content</Form.Label>
          <Form.Control onChange={handleChange} name="author" type="text" placeholder="Enter Content"  value={author}/>
         </Form.Group>

      <select onChange={handleCategoryChange}>
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
