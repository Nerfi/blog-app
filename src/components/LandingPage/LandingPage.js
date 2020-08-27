import React,{useState,useEffect} from 'react';
import './landingPage.css';
import Spinner from '../../UI/Spinner/Spinner'
import firebase from '../../firebase/firebase';
import PostsCard from '../../UI/Card/Card';

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


          });
          //I remove this from the inside loop  just like in the below function , I can not see the outcome because of the Card issue, once its solve check this outcome
             setBlogs(mostLike);
             console.log('the new state after defininig it after the LOOP is here ')
             setLoading(false);
      })
      .catch(function(error) {
        setError(error)

      });

    };

    fetchData();

  },[]);


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
            <PostsCard data={likesOnBlog} key={likesOnBlog.id} />

        ))
      );


    if(searchQueryResults.length > 0) {

     newResults = searchQueryResults.map(results =>
      <PostsCard  data={results}/>
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
            {/* BUTTON NEEDS TO BE FIXED*/}
          <button style={{height: '70px', backgroundColor: 'red'}} onClick={callSearchFucntion} type="submit" value="SEARCHWEY" />

      </div>

        <div className="containerBlogs">

            {newResults }

        </div>




    </div>

  );
}

export default LandinPage;



