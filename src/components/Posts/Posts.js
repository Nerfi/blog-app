import React, { useState, useEffect } from 'react';

import Post from '../Post/Post';


function Posts(props) {

  const [posts, setPosts] = useState([]);

    useEffect(() => {

      const fetchPostsFunction = async () => {

       const fetchPosts = await fetch('https://blog-fa351.firebaseio.com/posts.json');
        const response = await fetchPosts.json();

       const results = [];

        for(let post in response) {

          results.push({
            id: post,
            ...response[post]
          });
        }


        setPosts(results);
      };

    fetchPostsFunction();

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
