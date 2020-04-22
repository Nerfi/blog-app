import React, { useState, useEffect } from 'react';

import Post from '../Post/Post';

function Posts() {

  const [posts, setPosts] = useState([]);

    useEffect(() => {
         fetch('/posts')
        .then(response => {
          return response.json();
         })
        .then(json => setPosts(json))

      }, []);

  return (
    <div>

         {posts.map(post => {
            return(
              <Post post={post} key={post.id} />
              );

          })}

    </div>
  );
}

export default Posts;
