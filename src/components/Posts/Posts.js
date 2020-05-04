import React, { useState, useEffect } from 'react';

import Post from '../Post/Post';

function Posts() {

  const [posts, setPosts] = useState([]);

    useEffect(() => {

      const fetchPostsFunction = async () => {
       const fetchPosts = await fetch('/posts');
        const response = await fetchPosts.json();
        setPosts(response);
      };

    fetchPostsFunction();

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
