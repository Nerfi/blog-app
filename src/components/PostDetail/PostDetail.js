import React,{useState,useEffect, useContext} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom'
import './PostDetail.css';
import {AuthContext} from '../Context/AuthContext';
//importing firebase in order to make the PATCH request
import firebase from '../../firebase/firebase';


function PostDetails(props){


  const [selectedPost, setSelected] = useState({});
  const [error, setError] = useState(false);
  //calling the context
   const {currentUser} = useContext(AuthContext);
   //adding new state in order to handle auth errors
   const [authError, setAuthError] = useState(false);



  useEffect(() => {

    const selectPost = async () => {

        const docRef = firebase.firestore()
        .collection("posts")
        .doc(props.match.params.id)

      docRef.get().then(function(doc) {

          if (doc.exists) {
              setSelected(doc.data());
          } else {

              setError(!error)
          }
      }).catch(function(error) {
          setError(error)
      });


      }

    //calling the function
      selectPost();

  },[props.match.params.id]);





 const deleteSelectedPost = () => {

    if(currentUser.uid ===  selectedPost.currentUser) {

          firebase.firestore().collection("posts").doc(props.match.params.id).delete().then(function() {
            return console.log("Document successfully deleted!");
            /* here I should show a modal in order to let the user know that he/she deleted successfully the post he/she owns */
        }).catch(function(error) {
            setAuthError(error.message)
        });

        props.history.push('/posts');

    }


  }

    const addLikes = () => {

      const {likes} = selectedPost;

          const likePost = firebase
            .firestore()
            .collection('posts')
            .doc(props.match.params.id)
            .update({ likes: likes + 1})
            .then(function() {
              setSelected({...selectedPost,likes: likes + 1})

            })
            .catch(function(error) {
               setAuthError(error.message)
            })

    };



  //redirecting to a 404 in case an error occur
  if (error)  return <Redirect to="/404" />

  return(
     <Card key={selectedPost.id} className="singlePost">

          <Card.Body>

           <h1>{error}</h1>
           <h2>{authError}</h2>
            <Card.Title> <h1>{selectedPost.title}</h1></Card.Title>
             <img className="postDetail_img" src={selectedPost.imgUrl} alt="tag" />
            <p>{selectedPost.likes === 0 ? 'Be the first to like this post!' : selectedPost.likes} {selectedPost.likes ? "Times this post was liked" : null}</p>

            <Card.Text>
              Author : <strong>{selectedPost.author}</strong>
            </Card.Text>
              Category: {selectedPost.value}
             <Card.Text>
             </Card.Text>

             {
              currentUser && currentUser.uid === selectedPost.currentUser ? (
              <>

                <Button onClick={deleteSelectedPost} variant="danger">Delete</Button>
               <Link to={`/update/post/${props.match.params.id}`} > Update Post </Link>

             </>

              ) :  null
           }
            <Button onClick={addLikes} variant="success" style={{margin: '10px'}}>Like Post</Button>

          </Card.Body>

        </Card>
  );

}

export default PostDetails;
