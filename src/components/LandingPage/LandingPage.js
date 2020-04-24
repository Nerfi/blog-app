import React,{useState,useEffect} from 'react';
import Posts from  '../Posts/Posts';
import './landingPage.css';

//make API call
//filter post by most likes


const LandinPage = () => {
   //filter result by post with most likes
  const [blogs, setBlogs] =  useState([]);

  async function fetchBlogPosts () {

    const fetchPost = await fetch('/posts');
    const response = await fetchPost.json();
    setBlogs(response);

  };
  console.log(blogs)

  useEffect(() => {
    fetchBlogPosts();
  },[]);

  return(
    <div>
      <div className="app">
      </div>
      <p>Our Most Popular Posts </p>
      {/*check out how to filter an array and render post with likes > 5*/}
      {blogs.map(blog => {
        return <Posts key={blog.id}/>
      })}

    </div>

  );
}

export default LandinPage;
