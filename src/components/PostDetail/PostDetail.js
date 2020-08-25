import React,{useState,useEffect, useContext} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link, Route, Redirect} from 'react-router-dom'
import './PostDetail.css';
import {AuthContext} from '../Context/AuthContext';
//importing firebase in order to make the PATCH request
import firebase from '../../firebase/firebase';


function PostDetails(props){


  const [selectedPost, setSelected] = useState({});
  const [error, setError] = useState(false);
  //calling the context
   const {currentUser} = useContext(AuthContext);


  useEffect(() => {

    const selectPost = async () => {

        const docRef = firebase.firestore()
        .collection("posts")
        .doc(`${props.match.params.id}`)

      docRef.get().then(function(doc) {

          if (doc.exists) {
              setSelected(doc.data());
          } else {

              setError(!error)
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });


      }

    //calling the function
      selectPost();

  },[props.match.params.id]);





 const deleteSelectedPost = () => {

    if(currentUser.uid ===  selectedPost.currentUser) {

          firebase.firestore().collection("posts").doc(`${props.match.params.id}`).delete().then(function() {
            return console.log("Document successfully deleted!");
            /* here I should show a modal in order to let the user know that he/she deleted successfully the post he/she owns */
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        props.history.push('/posts');

    } else {
      alert('not working this shit ');
    }


  }


    const addLikes = () => {

      const {likes} = selectedPost;

          const likePost = firebase
            .firestore()
            .collection('posts')
            .doc(`${props.match.params.id}`)
            .update({ likes: likes + 1})
            .then(function() {
              setSelected({...selectedPost,likes: likes + 1})

            })
            .catch(function(error) {
               console.error("Error updating document: ", error);
            })

    };

    console.log(selectedPost, 'selectedPost aquim Post detail component')


  //redirecting to a 404 in case an error occur

    if (error)  return <Redirect to="/404" />

  return(
     <Card key={selectedPost.id} className="singlePost">

          <Card.Body>

           <h1>{error}</h1>
            <Card.Title> {selectedPost.title}</Card.Title>
             <img className="postDetail_img" src={selectedPost.imgUrl} alt="image tag" />
            <p>{selectedPost.likes === 0 ? 'Be the first to like this post!' : selectedPost.likes} {selectedPost.likes ? "Times this post was liked" : null}</p>

            <Card.Text>
              the author of this post is: <strong>{selectedPost.author}</strong>
            </Card.Text>
              Category: {selectedPost.value}
             <Card.Text>
             </Card.Text>
            <Button onClick={deleteSelectedPost} variant="danger">{currentUser.uid === selectedPost.currentUser ? "Delete" : "your not auth"}</Button>
             <Button onClick={addLikes} variant="success" style={{margin: '10px'}}>Like Post</Button>
              <Link to={`/update/post/${props.match.params.id}`} > Update Post </Link>
          </Card.Body>

        </Card>
  );

}

export default PostDetails;
