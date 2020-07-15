import React,{useState, useContext} from 'react';
import {Form} from 'react-bootstrap';
//importiung the context
import {UserContext} from '../Context/AuthContext';
//adding firebase methods
import firebase from '../../firebase/firebase';



//1 importamos el hook useContext, el cual nos va a permitir usar el contexto creado anteriormente
//2 importamos la folder donde tenemos el context con su initial value, y la llamamos
// en cada componente que queremos usar dichos valores.

function Post(props) {

  //adding context, probably change with firebase firestroe
  //const {newData, setNewData} = useContext(UserContext);
  const [category, setCategory] = useState({value: ''});

  const [details, setDetails] = useState({
    title:"",
   author: "",
   likes: null
 });

  const handleCategorChange = event => {
    setCategory({value: event.target.value});
  }


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


  return (
    <div>
      <Form onSubmit={addPost}>
        <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={handleChange} name="title" type="text" placeholder="Enter title"  />
        </Form.Group>

          <div className="form-group">
          <label for="exampleFormControlTextarea1">Write your history</label>
          <textarea className="form-control"  onChange={handleChange} name="author" required id="exampleFormControlTextarea1" rows="3" placeholder="Write your history"></textarea>
        </div>

      <select onChange={handleCategorChange}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option  value="News">News</option>
        <option value="Tech">Tech</option>
      </select>



      </Form>
      <button onClick={addPost}>Add Post</button>
    </div>
  );
}


export default Post;
