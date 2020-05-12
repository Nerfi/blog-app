import React,{useState,useEffect, useContext} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import SearchBar from '../../UI/SearchBar';
import Spinner from '../../UI/Spinner/Spinner'
import {UserContext} from '../Context/AuthContext';
//1 importamos el hook useContext, el cual nos va a permitir usar el contexto creado anteriormente
//2 importamos la folder donde tenemos el context con su initial value, y la llamamos
// en cada componente que queremos usar dichos valores.

const LandinPage = (props) => {

  const [blogs, setBlogs] =  useState([]);
  const [searchQuery, setQuery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //storing the context we want to use in a variable
  const message = useContext(UserContext);


  useEffect(() => {

     const fetchBlogPosts = async () => {
      //not sure if this is the best way to implement the SPinner componennt
      setLoading(prevLoading => {return !prevLoading});
      const fetchPost = await fetch('https://blog-fa351.firebaseio.com/posts.json');
      const response = await fetchPost.json();
      response.error ? setError(response.error.message) : setLoading(loading)

      const fetchedPosts = [];

      for(let post in response) {

         fetchedPosts.push({

            id: post,
            ...response[post]

         });

      }

      setBlogs(fetchedPosts);

    };

    fetchBlogPosts();

  },[]);

// need to check firebase docs for search fucnitonalitty

  const search = async (query) => {
    const searchTerms = await fetch(`https://blog-fa351.firebaseio.com/posts?q${query}.json`);
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
//not working since I have not check the firebase docs for thsi
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

if(loading) return newResults = <Spinner/>;



  return(

    <div>
      <div className="app">
        <SearchBar search={search} />
      </div>


      <p style={{color:'red' }}>Our Most Popular Posts </p>

      <div className="containerBlogs">

        {newResults }
        <p>Abajo esta el context</p>

      </div>

        {message}



    </div>

  );
}

export default LandinPage;
