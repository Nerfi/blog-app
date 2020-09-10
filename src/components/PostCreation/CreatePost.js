import React,{useState, useContext} from 'react';
//adding firebase methods, we import storage in order to upload files into firebase, in this case a photo
import  firebase, {storage} from '../../firebase/firebase';
import {AuthContext } from '../../../src/components/Context/AuthContext';
import './PostCreation.css';


function Post(props) {

  // adding img upload to firebase
  const allInputs = {imgUrl: ''};
  const [imageAsFile , setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);


  const [error, setError] = useState();


  const [category, setCategory] = useState({value: ''});
  const [details, setDetails] = useState({
    title:"",
   author: "",
   likes: 0
 });

  //importing context in order to grab the user uid
  const { currentUser } = useContext(AuthContext);

  //handling selection of category
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

//creating a function to handle uploading of an img into firestoreage

  const uploadImg = () => {

    //addig firebase upload img
    if(imageAsFile === '') {
      //borrar el console log
      console.log(` not an image, the ima is ${typeof(imageAsFile)}`)
      //setError(true)
    }
    //with this const we are uploading the img to firebase
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

    //initiates the firebase side uploading
    uploadTask.on('state_changed',
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot, ' aqui esta el snapShot line 60')
    }, (err) => {
      //catches the errors
      console.log(err)
      setError(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    })


  };

  const addPost = (event) => {

    event.preventDefault();


    //deconstructing the objecst state, aqui empieza la post reques to firebase
    const {title, author, likes}  = details;
    const { value } = category;
    const {imgUrl}  = imageAsUrl;

    //taking the history prop
    const {history} = props;


    // adding new post!
    if(currentUser && imgUrl) {


       firebase
        .firestore()
        .collection("posts")
        .add({
          title,
          author,
          likes,
          value,
          imgUrl: imgUrl,
          currentUser: currentUser.uid,

        })
          .then(function() {
            history.push("/")
        })
          .catch(error => {
            setError(error.message, 'this is the error');
          })
    }

      // calling function in order to upload img
        uploadImg();

  };


   const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageFile => (image))
  };


  if(error) return <h1>{error}</h1>



  return (

      <div className="create_div" >

      <form onSubmit={addPost}>

       <div className="form_control">

        <label>Title:</label>

          <input type="text"
           className="form-control"
           placeholder="Enter title"
           name="title"
           onChange={handleChange}
           required
           />

       </div>

        <div className="form-group">

          <label >Content:</label>

          <input
          type="content"
          className="form-control"
          required
          placeholder="Write your history"
          name="author"
          onChange={handleChange}
          />

        </div>

        <input
        type="file"
        onChange={handleImageAsFile}
        required
         />

         <select  onChange={handleCategorChange} required>
          <option value="News">News</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Tech">Tech</option>
        </select>

        <button type="submit" className="btn_create" >Add Post</button>


      </form>


    </div>
  );
}


export default Post;
