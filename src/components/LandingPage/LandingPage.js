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

    //fetching default values for landing page, the most popular posts

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
             setBlogs(mostLike);
             setLoading(false);
      })
      .catch(function(error) {
        setError(error.message)

      });

    };

    fetchData();

  },[]);


    const callSearchFucntion = async (e) => {

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

  //aqui estan los resultados dela busqueda del usuario no olvidar borrar esto despies
  console.log(searchQueryResults,'searchQueryResults array is here line 97')


    let newResults  = (

          blogs.map(likesOnBlog => (
            <PostsCard data={likesOnBlog} key={likesOnBlog.id} />

        ))
      );

    if(searchQueryResults.length > 0) {

     newResults = searchQueryResults.map(results =>
      <PostsCard  key={results.id} data={results}/>
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
          <button type="submit" onClick={callSearchFucntion}>Click Me!</button>

      </div>

        <div className="containerBlogs">

            {newResults }

        </div>





    </div>

  );
}

export default LandinPage;



