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

  //checking if the ID is save in the blogs state array
  console.log(blogs, 'blogs here WITH ID ')


    const callSearchFucntion = (e) => {

      //e.preventDefault() not working

    const db = firebase.firestore()

    db.collection("posts").where("title", "==", query )
    .get()
    .then(function(querySnapshot) {

      const fetchedPosts = [];

        querySnapshot.forEach(function(doc) {

          fetchedPosts.push(doc.data());

          setQueryResults(fetchedPosts);

          /* delete for testing porpuses, undo the action once
          I have to work on that feature */

          //console.log(searchQueryResults,'searchQueryResults')

        });
    })
    .catch(function(error) {
       setError(error);
    });

  };


  useEffect(() => {
      callSearchFucntion();
  },[query]);

  console.log(searchQueryResults,'searchQueryResults')


    let newResults  =

          blogs.map(likesOnBlog => (


           <Card key={likesOnBlog.id} >

           {console.log(likesOnBlog.id, 'likesOnBlog ID')}

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



