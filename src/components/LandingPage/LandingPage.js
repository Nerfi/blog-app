import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import Spinner from '../../UI/Spinner/Spinner'
import firebase from '../../firebase/firebase';

const LandinPage = (props) => {

  const [blogs, setBlogs] = useState([])
  const [searchQueryResults, setQueryResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  //user query
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

             mostLike.push(doc.data());

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

 console.log(blogs, 'blogs fwit more than 10 likes')

    const callSearchFucntion = (e) => {

      //e.preventDefault() not working

    const db = firebase.firestore()

    db.collection("posts").where("title", "==", query ) // not working
    .get()
    .then(function(querySnapshot) {

      const fetchedPosts = [];

        querySnapshot.forEach(function(doc) {

          fetchedPosts.push(doc.data());

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
  },[query]);

      console.log(searchQueryResults,'searchQueryResults')

  //when the component mounts again the whole array is loaded, that's not what I wanted

    let newResults  = (

          blogs.map(likesOnBlog => (

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



