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
  const [searchQuery, setQuery] = useState([]);
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

      //e.preventDefault();


      //logic should be here
      const db =  firebase.firestore().collection('posts');
      let queryy =  db.where("title", "==", "juan")
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach(doc => {
          //this data is individual object with key--values, the get logged in separeted lines, one by one
          console.log(doc.data(), 'document given bakc from firebase firestore line 68')

          const dataGotten = doc.data();

          const arr = [];
          arr.push(dataGotten)
          console.log(arr, 'arr is here')

          setQuery(arr)
          console.log(searchQuery, 'searchQuery')

          /* new test from stackoverflow
             const matchedPosts = Object.values(doc.data() )
              .map(objc => {
                return setQuery(objc);
              });
              console.log(matchedPosts, 'matchedPosts here')

           qui acaba el codig online
           */

            //creating the array on wich we will store the data coming bakc from firebase


          //const matchedObj = Object.values(doc.data())
            //.map(obj => {
             //     return arr.push(obj)
            //})
          //arr.push(doc.data())


          //setQuery(arr);
          //console.log(arr, 'arr array is here, this is line 99')

        })

        setQuery(''); //cleanign the state
      })
      .catch(e => {
        console.log(e, ' the error is there')
      })

  };

  //here jus tfor testing , dont forget to delete it

  useEffect(() => {
      callSearchFucntion()
  },[]);
  //the console log underneth is not what I was looking for to get

 // console.log(searchQuery, 'array of post to iterate over is here 110')

  console.log(typeof(searchQuery), 'array of post to iterate over is here, also TYPEof 112')

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
  //if(searchQuery) {

    //  newResults =  searchQuery.map(blogQuery => (

      //<Card className="card" key={blogQuery.id} >
        //<Card.Body >
        //<Card.Title> <Link to={`/post/${blogQuery.id}`}> {blogQuery.title} </Link></Card.Title>
       // <p>{blogQuery.likes} times this post was liked</p>
        //<Card.Text>
        //Created by: {blogQuery.author}
        //{blogQuery.category}
        //</Card.Text>

        //</Card.Body>

      //</Card>
  //));
//};

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



