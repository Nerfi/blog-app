import React,{useState,useEffect, useContext} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link, Route, Routes, Redirect} from 'react-router-dom'
import UpdatePost from '../UpdatePost/UpdatePost';

import './PostDetail.css';
import {UserContext} from '../Context/AuthContext';
//importing firebase in order to make the PATCH request
import firebase from '../../firebase/firebase';


//esta fucnion acepta props porque los que vamos a usar son los del navbar, history and so on, check out that lesson again.

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



  },[])




  const deleteSelectedPost = () => {

      const {token} = newData;

    const deletePost = fetch(`https://blog-fa351.firebaseio.com/posts?auth=${token}/${props.match.params.id}.json`, {
      method: 'DELETE'
    });

    props.history.push('/posts');

  }

  //const addLikes = async () => {
      // Like: no se aumenta automaticamente, arreglar este problema
             //const postDetails = {
             // method: 'PATCH',
              //body: JSON.stringify({
              //likes: selectedPost.likes + 1
              //}),
               //headers:  {
                 //"Content-type": "application/json charset=UTF-8"
                //}
              //};

            //extracting the token from the newData object using context API
            //const {token} = newData;
              //const postRequest = await fetch(`https://blog-fa351.firebaseio.com/posts?auth=${token}/${props.match.params.id}.json`, postDetails);
              //const response = await postRequest.json();
              //setSelected(response);
              //console.log(response, 'aqui tengo que buscar el error')

              //return response.error ? setError(error) :  null;

              //adding firebase code to PATCH request, to add likes to the post

              //const db = await firebase.firestore()
              //db.collection('posts').doc(props.match.params.id).set({...selectedPost, likes: selectedPost.likes + 1})





    //};


    //new function
    const addLikes = () => {


          const likePost = firebase
            .firestore()
            .collection('posts')
            .doc(`${props.match.params.id}`)
            .update({ ...selectedPost,likes: selectedPost.likes + 1})
            .then(function() {
              console.log('goood is working')
            })
            .catch(function(error) {
               console.error("Error updating document: ", error);
            })

    }


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
