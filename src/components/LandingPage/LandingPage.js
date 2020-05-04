import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import SearchBar from '../../UI/SearchBar';

const LandinPage = (props) => {

  const [blogs, setBlogs] =  useState([]);
  const [searchQuery, setQuery] = useState([]);

  useEffect(() => {

     const fetchBlogPosts = async () => {

      const fetchPost = await fetch('/posts');
      const response = await fetchPost.json();
      setBlogs(response);

    };

    fetchBlogPosts();

  },[]);



  const search = async (query) => {
    const searchTerms = await fetch(`/posts?q=${query}`);
    const response = await searchTerms.json();
    setQuery(response);

  };



  //when the component mounts again the whole array is loaded, that's not what I wanted

    let newResults  = (

       blogs.filter(blog => blog.likes > 10).map(likesOnBlog => (

           <Card key={likesOnBlog.id} >
              <Card.Body >
                <Card.Title> <Link to={`/post/${likesOnBlog.id}`}> {likesOnBlog.title} </Link></Card.Title>
                <p>{likesOnBlog.likes} times this post was liked</p>
                <Card.Text>
                  Created by: {likesOnBlog.author}
                  {likesOnBlog.category}
                </Card.Text>


              </Card.Body>

            </Card>
        ))
  );

  if(searchQuery.length >= 1) {

      newResults =  searchQuery.map(blogQuery => (

      <Card className="card" key={blogQuery.id} >
        <Card.Body >
        <Card.Title> <Link to={`/post/${blogQuery.id}`}> {blogQuery.title} </Link></Card.Title>
        <p>{blogQuery.likes} times this post was liked</p>
        <Card.Text>
        Created by: {blogQuery.author}
        {blogQuery.category}
        </Card.Text>

        </Card.Body>

      </Card>
  ));
};


  return(

    <div>
      <div className="app">
        <SearchBar search={search} />
      </div>


      <p style={{color:'red' }}>Our Most Popular Posts </p>

      <div className="containerBlogs">
        {newResults }
      </div>



    </div>

  );
}

export default LandinPage;
