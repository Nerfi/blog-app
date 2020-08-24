import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import Spinner from '../../UI/Spinner/Spinner'
import firebase from '../../firebase/firebase';

const LandinPage = (props) => {

  const [blogs, setBlogs] = useState()
  const [searchQueryResults, setQueryResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //newsetter for testing firebase firestroe
  const [newPosts , setNewPosts] = useState([]);

  //user query
  const [query, setQuery] = useState('');


   const handleChange = e => setQuery(e.target.value);


  useEffect(() => {

  const fetchData = async () => {

    setLoading(prevLoading => !prevLoading);

    //chagne this later on for my own data
      const db = firebase.firestore();

      db.collection("posts").where("likes", ">=", 10)
      .get()
      .then(function(querySnapshot) {

        const mostLike = [];

          querySnapshot.forEach(function(doc) {

             mostLike.push(doc.data());

             setBlogs(mostLike);
             console.log(blogs, 'blogs from the API call here')
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });


      setLoading(prev => !prev);

    };

    fetchData();

  },[blogs]);

 console.log(blogs, 'blogs fwit more than 10 likes')

    const callSearchFucntion = (e) => {

      //e.preventDefault()

    const db = firebase.firestore();

    db.collection("posts").where("title", "==", query ) // not working
    .get()
    .then(function(querySnapshot) {

      const fetchedPosts = [];

        querySnapshot.forEach(function(doc) {

          fetchedPosts.push(doc.data())
          setQueryResults(fetchedPosts);

          console.log(searchQueryResults,'searchQueryResults')

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  };


  useEffect(() => {
      callSearchFucntion();
  },[]);

      console.log(searchQueryResults,'searchQueryResults')

  //firebase test, CURRENTLY RENDERING THIS
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

       blogs.map(likesOnBlog => (

           <Card key={likesOnBlog.id} >
              <Card.Body >
              <h1>sdfasdf</h1>
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


if(loading) return newResults = <Spinner/>;



  return(

    <div>
      <div className="app">
            <form>
              <input
                placeholder="Search for Posts"
                value={query}
                onChange={handleChange}
              />
          <button style={{height: '70px', backgroundColor: 'red'}} onClick={callSearchFucntion} type="submit" value="SEARCHWEY" />

        </form>

      </div>

      <div className="containerBlogs">

        {newResults }


        {newPostss}

      </div>

    </div>

  );
}

export default LandinPage;



