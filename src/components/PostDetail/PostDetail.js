import React,{useState,useEffect, useContext} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link, Route, Routes, Redirect} from 'react-router-dom'
import UpdatePost from '../UpdatePost/UpdatePost';
import './PostDetail.css';
import {UserContext} from '../Context/AuthContext';
//importing firebase in order to make the PATCH request
import firebase from '../../firebase/firebase';


function PostDetails(props){


  const [selectedPost, setSelected] = useState({});

  const [error, setError] = useState(false);
  //importing the context object
  const {newData} = useContext(UserContext);


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



  },[]);




//needst o be done again with firebase methods

  const deleteSelectedPost = () => {

      const {token} = newData;

    const deletePost = fetch(`https://blog-fa351.firebaseio.com/posts?auth=${token}/${props.match.params.id}.json`, {
      method: 'DELETE'
    });

    props.history.push('/posts');

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


  //redirecting to a 404 in case an error occur

    if (error) {
      return <Redirect to="/404" />
    }

  return(
     <Card key={selectedPost.id} className="singlePost">

          <Card.Body >
           <h1>{error}</h1>
            <Card.Title> {selectedPost.title}</Card.Title>
            <p>{selectedPost.likes === 0 ? 'Be the first to like this post!' : selectedPost.likes} {selectedPost.likes ? "Times this post was liked" : null}</p>

            <Card.Text>
              the author of this post is: <strong>{selectedPost.author}</strong>
            </Card.Text>
              Category: {selectedPost.value}
             <Card.Text>
             </Card.Text>
            <Button onClick={deleteSelectedPost} variant="danger">Delete</Button>
             <Button onClick={addLikes} variant="success" style={{margin: '10px'}}>Like Post</Button>
              <Link to={`/update/post/${props.match.params.id}`} > Update Post </Link>
          </Card.Body>

        </Card>
  );

}

export default PostDetails;
