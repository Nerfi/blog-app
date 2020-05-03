import React,{useState} from 'react';
import {Form} from 'react-bootstrap';

function Post(props) {

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


      const postDetails = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  title,  author,  value, likes })
      };

      if(title.length && author.length > 5) {

        const postRequest =  await fetch('/posts', postDetails)
        const response = await postRequest.json();
        setDetails(response);

          props.history.push('/posts');

      } else {
        alert('You need to typed int something =)')
      }
         event.preventDefault();

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
