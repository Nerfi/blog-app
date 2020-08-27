import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import Spinner from '../../UI/Spinner/Spinner'
import firebase from '../../firebase/firebase';

const LandinPage = (props) => {

  const [blogs, setBlogs] = useState([])
  const [searchQueryResults, setQueryResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');


   const handleChange = e => setQuery(e.target.value);


  useEffect(() => {

  const fetchData = async () => {

    setLoading(true);

      const db = firebase.firestore()

      db.collection("posts").where("likes", ">=", 10)
      .get()
      .then(function(querySnapshot) {

        const mostLike = [];

          querySnapshot.forEach(function(doc) {

            const deconstrucId = {
              id: doc.id,
              ...doc.data()
            };

             mostLike.push(deconstrucId);

             setBlogs(mostLike);

          });
             setLoading(false);
      })
      .catch(function(error) {
        setError(error)

      });

    };

    fetchData();

  },[]);



  // USER QUERYING DATA FUNCTION HERE
    const callSearchFucntion = (e) => {

    const db = firebase.firestore()

    db.collection("posts").where("title", "==", query )
    .get()
    .then(function(querySnapshot) {

      const fetchedPosts = [];

        querySnapshot.forEach(function(doc) {

             const deconstrucId = {
              id: doc.id,
              ...doc.data()
            };


          fetchedPosts.push(deconstrucId);


        });
        //tip: never update the state inside a loop!!
          setQueryResults(fetchedPosts);
    })
    .catch(function(error) {
       setError(error);
    });

  };


  useEffect(() => {
      callSearchFucntion();
  },[]);

  //make sure to delte this after solving the issue
  console.log(searchQueryResults,'searchQueryResults array is here line 99')


    let newResults  = (

          blogs.map(likesOnBlog => (


           <Card key={likesOnBlog.id} >
              <Card.Body >
                <Card.Title>
                <Link to={`/post/${likesOnBlog.id}`}>
                  {likesOnBlog.title} </Link>
                </Card.Title>
                <p>{likesOnBlog.likes} times this post was liked</p>
                <Card.Text>
                  Created by: {likesOnBlog.author}
                  {likesOnBlog.category}
                </Card.Text>


              </Card.Body>

            </Card>
        ))
      );


    if(searchQueryResults.length > 0) {

     newResults = searchQueryResults.map(results =>

        <Card key={results.id} >
              <Card.Body >
                <Card.Title>
                <Link to={`/post/${results.id}`}>
                  {results.title} </Link>
                </Card.Title>
                <p>{results.likes} times this post was liked</p>
                <Card.Text>
                  Created by: {results.author}
                  {results.category}
                </Card.Text>


              </Card.Body>

            </Card>
      )
    }


if(loading) return newResults = <Spinner/>;

  return(

    <div>
      <div className="app">
              <input
                placeholder="Search for Posts"
                value={query}
                onChange={handleChange}
              />
          <button style={{height: '70px', backgroundColor: 'red'}} onClick={callSearchFucntion} type="submit" value="SEARCHWEY" />

      </div>

      <div className="containerBlogs">

        {newResults }

      </div>

    </div>

  );
}

export default LandinPage;



