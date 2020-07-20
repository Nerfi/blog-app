import React,{useState, useContext} from 'react';
import {Form} from 'react-bootstrap';
//adding firebase methods
import firebase from '../../firebase/firebase';

//creating ref to firestroe and storage
const db = firebase.firestore();
const storage = firebase.storage();


function Post(props) {

  const [category, setCategory] = useState({value: ''});

  const [details, setDetails] = useState({
    title:"",
   author: "",
   likes: null
 });

//firestore uploading img
  const [file, setFile] = useState(null);

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


  const addPost = async event => {

      const {title,author,likes} = details;

      const{value} = category;
         //adding firebase methods
         firebase
         .firestore()
         .collection('posts')
         .add({
            title,
            author,
            likes,
            value
         })
         .then(() => {
            props.history.push("/")

         })


  }

  //function to upload img to firestore
  //need to create a ref to the db firestore in the example is const db = app.firestroe()
  const uploadImg = async () => {

    const storageRef = storage.ref();
    //not sure what this does
    const fileRef = storageRef.child(file)
    await fileRef.put(file)
    db.collection('posts').doc().update({
       images: firebase.firestore.FieldValue.arrayUnion({
        name: file.name,
        url: await  fileRef.getDownloadURL()
       })
    })

  }

  //onfile Change
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }


  return (

    <div className="create_div" style={{display: 'flex', justifyContent: 'center', marginTop: '15vh'}}>

      <Form onSubmit={addPost} >
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} name="title" type="text" placeholder="Enter title"  />
        </Form.Group>

          <div className="form-group">
          <label for="exampleFormControlTextarea1">Write your history</label>
          <textarea className="form-control"  onChange={handleChange} name="author" required id="exampleFormControlTextarea1" rows="3" placeholder="Write your history"></textarea>
        </div>

        <input type='file' onChange={onFileChange}/>

      <select onChange={handleCategorChange}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option  value="News">News</option>
        <option value="Tech">Tech</option>
      </select>



        <button style={{margin: '20px'}} onClick={addPost}>Add Post</button>
      </Form>
    </div>
  );
}


export default Post;
