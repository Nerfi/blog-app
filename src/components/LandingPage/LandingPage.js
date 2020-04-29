import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import SearchBar from '../../UI/SearchBar';

const LandinPage = (props) => {

  const [blogs, setBlogs] =  useState([]);

   const fetchBlogPosts = async () => {

    const fetchPost = await fetch('/posts');
    const response = await fetchPost.json();
    setBlogs(response);

  };

  useEffect(() => {
    fetchBlogPosts();
  },[]);

  //fake fucntion not pay attention to it
  const addLikes = () => alert('hello world JUANAKO');

  //adding function for the searchBar component

  const search = async (query) => {
    const searchTerms = await fetch(`/posts?q=${query}`);
    const response = await searchTerms.json();
    setBlogs(response);

  }


  return(
    <div>
      <div className="app">
        <SearchBar search={search} />
      </div>
      <p style={{position:'center'}}>Our Most Popular Posts </p>

      {blogs.filter(blog => blog.likes > 10).map(likesOnBlog => (

         <Card key={likesOnBlog.id} style={{width: '38rem', display: 'flex', flexWrap: 'wrap',alingContent: 'center'}}>
            <Card.Body >
              <Card.Title> <Link to={`/post/${likesOnBlog.id}`}> {likesOnBlog.title} </Link></Card.Title>
              <p>{likesOnBlog.likes} times this post was liked</p>
              <Card.Text>
                Created by: {likesOnBlog.author}
                {likesOnBlog.category}
              </Card.Text>

               <Button onClick={addLikes} variant="success" style={{margin: '10px'}}>Like Post</Button>
            </Card.Body>

          </Card>
      ))}

    </div>

  );
}

export default LandinPage;
