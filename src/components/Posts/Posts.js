import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';
import firebase from '../../firebase/firebase';


function Posts(props) {

  const [posts, setPosts] = useState([]);

    useEffect(() => {

      //new async function in order to call firebase and render posts from firebase
      const fetchPosts = async () => {
        const fetch = await firebase.firestore()
        .collection('posts')
        .onSnapshot((snap) => {
          const response  = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
         setPosts(response)
        })


      }

      fetchPosts();

    }, []);

  return (
    <div>

         {posts.map(post => {
            return(
              <div>
                <Post post={post} key={post.id}  match={props.match}/>

              </div>
              );

          })}

    </div>
  );
}

export default Posts;
