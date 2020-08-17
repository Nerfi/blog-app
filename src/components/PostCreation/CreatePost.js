import React,{useState} from 'react';
import {Form} from 'react-bootstrap';
//adding firebase methods
import  firebase, {storage} from '../../firebase/firebase';


function Post(props) {

  // adding img upload to firebase
  const allInputs = {imgUrl: ''};
  const [imageAsFile , setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);


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

  };




  const addPost = (event) => {

    event.preventDefault();


    //addig firebase upload img
    if(imageAsFile === '') {
      console.log(` not an image, the ima is ${typeof(imageAsFile)}`)
    }
    //with this const we are uploading the img to firebase
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

    //initiates the firebase side uploading
    uploadTask.on('state_changed',
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    })


    const {title, author, likes}  = details;
    const { value } = category;
    const {imgUrl}  = imageAsUrl;


    // code from firestore
    if(title && author  && value && imgUrl) {

       firebase
        .firestore()
        .collection("posts")
        .add({
          title,
          author,
          likes,
          value,
          imgUrl: imgUrl
        })
          .then(function() {
            props.history.push("/")
        })
          .catch(error => {
            console.log(error, 'this is the error')
          })
    }


  }


   const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageFile => (image))
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



        <input
// allows you to reach into your file directory and upload image to the browser
          type="file"
          onChange={handleImageAsFile}
        />


      <select onChange={handleCategorChange}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option  value="News">News</option>
        <option value="Tech">Tech</option>
      </select>



        <button type="button" style={{margin: '20px'}} onClick={addPost}>Add Post</button>
      </Form>
    </div>
  );
}


export default Post;
