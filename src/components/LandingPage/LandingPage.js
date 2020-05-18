import React,{useState,useEffect, useContext} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import SearchBar from '../../UI/SearchBar';
import Spinner from '../../UI/Spinner/Spinner'
import {UserContext} from '../Context/AuthContext';
//importing firebase firestore
import firebase from '../../firebase/firebase';

const LandinPage = (props) => {
//need to be delete blogs state
  const [blogs, setBlogs] =  useState([]);
  const [searchQuery, setQuery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //newsetter for testing firebase firestroe
  const [newPosts , setNewPosts] = useState([]);


  useEffect(() => {

  const fetchData = async () => {
    setLoading(prevLoading => {return !prevLoading});

    const unsubscribe = firebase
    .firestore()
    .collection('posts')
    .onSnapshot((snap) => {
      const newData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))

      setNewPosts(newData);
      setLoading(prev => !prev);

    })
      //when we cahnge out tab we want to drop the susbcrition we have with
      //firebase firestore., that's why we do this,see the video bakc again for more details
    return () => unsubscribe();


  };

  fetchData();






  },[]);

// need to check firebase docs for search fucnitonalitty

  const search = async (query) => {
    const searchTerms = await fetch(`https://blog-fa351.firebaseio.com/posts?q${query}.json`);
    const response = await searchTerms.json();
    setQuery(response);

  };

  //firebase test
  let newPostss =  newPosts.map(blogQuery => (

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

        {newPostss}



      </div>

    </div>

  );
}

export default LandinPage;



