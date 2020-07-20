import React,{useState} from 'react';
import {Form} from 'react-bootstrap';
//adding firebase methods
import firebase from '../../firebase/firebase';

function Post(props) {

  const [category, setCategory] = useState({value: ''});

  const [details, setDetails] = useState({
    title:"",
   author: "",
   likes: null
 });


  const handleCategorChange = event => setCategory({value: event.target.value});


  const handleChange = event => {

    let name = event.target.name;
    let value = event.target.value;

       setDetails(prevPosts => {
        return {
        ...prevPosts,
        [name]: value
        }
      })

  }


  const addPost = (event) => {

    event.preventDefault();

    const {title, author, likes }  = details;
    const {value} = category;


    // code from firestore
    if(title && author  && value) {

       firebase
        .firestore()
        .collection("posts")
        .add({
          title,
          author,
          likes,
          value
        })
          .then(function(docRef) {
            console.log( 'document saved', docRef.id)
        })
          .catch(error => {
            console.log(error, 'this is the error')
          })
    }


  }



  return (

    <div className="create_div" style={{display: 'flex', justifyContent: 'center', marginTop: '15vh'}}>

      <Form>
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} name="title" type="text" placeholder="Enter title"  required/>
        </Form.Group>

          <div className="form-group">
          <label >Write your history</label>
          <textarea className="form-control"  onChange={handleChange} name="author" required  rows="3" placeholder="Write your history"></textarea>
        </div>

      <select onChange={handleCategorChange}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option  value="News">News</option>
        <option value="Tech">Tech</option>
      </select>



      </Form>
        <button style={{margin: '20px'}} onClick={addPost}>Add Post</button>
    </div>
  );
}


export default Post;
