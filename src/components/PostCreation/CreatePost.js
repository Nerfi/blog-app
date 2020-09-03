import React,{useState, useContext} from 'react';
//adding firebase methods, we import storage in order to upload files into firebase, in this case a photo
import  firebase, {storage} from '../../firebase/firebase';
import {AuthContext } from '../../../src/components/Context/AuthContext';


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
   likes: null
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
      console.log(` not an image, the ima is ${typeof(imageAsFile)}`)
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

    // calling function in order to upload img
    uploadImg();


    //deconstructing the objecst state, aqui empieza la post reques to firebase
    const {title, author, likes}  = details;
    const { value } = category;
    const {imgUrl}  = imageAsUrl;

    //taking the history prop
    const {history} = props;


    // adding new post!, not working validation of all the input fields
    if(title && author  && value && imgUrl) {

       firebase
        .firestore()
        .collection("posts")
        .add({
          title,
          author,
          likes,
          value,
          imgUrl: imgUrl,
          currentUser: currentUser.uid

        })
          .then(function() {
            history.push("/")
        })
          .catch(error => {
            console.log(error.message); //error not catch
            setError(error.message, 'this is the error');
          })
    }

  };


   const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageFile => (image))
  };



  return (

  /*Borrar este inline style del div create_div in order to have a cleaner code*/

      <div className="create_div" style={{display: 'flex', justifyContent: 'center', marginTop: '15vh'}}>

      <form onSubmit={addPost}>

       <div className="form_control">

        <label>Title:</label>
          <input type="text"
           className="form-control"
           placeholder="Enter title"
           name="title"
           required
           />
       </div>

        <div className="form-group">
          <label >Content:</label>
          <input type="text" className="form-control"  required  placeholder="Write your history" name="content"  />
        </div>


        <input type='file' onChange={handleImageAsFile}  required />

         {/* <select onChange={handleCategorChange} required >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option  value="News">News</option>
            <option value="Tech">Tech</option>
          </select>
        */}

           <select  required onChange={handleCategorChange}>
          <option value="">None</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <button type="submit" style={{margin: '20px'}}  >Add Post con nueva forma</button>


      </form>


    </div>
  );
}


export default Post;
