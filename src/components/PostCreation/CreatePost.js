import React,{useState, useContext} from 'react';
import {Form} from 'react-bootstrap';
//importiung the context
import {UserContext} from '../Context/AuthContext';
//adding firebase methods
import firebase from '../../firebase/firebase';



//1 importamos el hook useContext, el cual nos va a permitir usar el contexto creado anteriormente
//2 importamos la folder donde tenemos el context con su initial value, y la llamamos
// en cada componente que queremos usar dichos valores.
firebase.firestore().collection('posts').add({
  title: 'juan',
  author: 'paredes',
  likes: null
});
function Post(props) {

  const [category, setCategory] = useState({value: ''});
  //adding context
  const {newData, setNewData} = useContext(UserContext);


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


     // const postDetails = {
       // method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({  title,  author,  value, likes })
      //};
    //esot se puede hacer en firebase tbn
      //if(title.length && author.length > 5) {
        //  const {token} = newData;
        //const postRequest =  await fetch(`https://blog-fa351.firebaseio.com/posts.json?auth=${token}`, postDetails)
        //const response = await postRequest.json();
        //setDetails(response);

          //props.history.push('/posts');

      //} else {
        //alert('You need to typed int something')
      //}
         //event.preventDefault();

         //adding firebase methods
         //not working


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
