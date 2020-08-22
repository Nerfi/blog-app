import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './landingPage.css';
import SearchBar from '../../UI/SearchBar';
import Spinner from '../../UI/Spinner/Spinner'
//importing firebase firestore
import firebase from '../../firebase/firebase';

const LandinPage = (props) => {
//need to be delete blogs state
  const [blogs, setBlogs] =  useState([]);
  const [searchQueryResults, setQueryResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  //newsetter for testing firebase firestroe
  const [newPosts , setNewPosts] = useState([]);


  useEffect(() => {

  const fetchData = async () => {

    setLoading(prevLoading => !prevLoading);

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



  //NEW METHOD IMPORTED FROM SEARCHBAR FUNCTION IN ORDER TO STORE THE RETRIEVED DATA INTO THIS NEW STATE

    const callSearchFucntion = e => {


    const db = firebase.firestore()

    db.collection("posts").where("title", "==", "juan")
    .get()
    .then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data(), "=>", doc.data().likes);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });



  console.log(searchQueryResults, 'searchProp')
  };

  //here jus tfor testing , dont forget to delete it

  useEffect(() => {
      callSearchFucntion()
  },[]);
  //the console log underneth is not what I was looking for to get


  //firebase test, currently rendering this
  let newPostss =  newPosts.map(blogQuery => (

      <Card className="card" key={blogQuery.id} >
        <Card.Body >
        <h1>akfksajbdkfja</h1>
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
        <SearchBar  searchProp={callSearchFucntion}/>
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



