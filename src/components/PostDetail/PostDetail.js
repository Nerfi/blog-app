import React,{useState,useEffect, useContext} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link, Route, Routes, Redirect} from 'react-router-dom'
import UpdatePost from '../UpdatePost/UpdatePost';
import NoMatch from '../NoMatch/NoMatch';
import './PostDetail.css';
import {UserContext} from '../Context/AuthContext';


function PostDetails(props){

  const [selectedPost, setSelected] = useState({});
  const [error, setError] = useState(false);
  //importing the context object
  const {newData} = useContext(UserContext);

  useEffect(() => {

      const selectPost = async () => {

          const fetchSinglePost = await fetch(`https://blog-fa351.firebaseio.com/posts/${props.match.params.id}.json`);
          if(!fetchSinglePost) {setError(true)}
          const response = await fetchSinglePost.json();
          setSelected(response);

    }

    selectPost();

},[]);

  const deleteSelectedPost = () => {

    const deletePost = fetch(`https://blog-fa351.firebaseio.com/posts/${props.match.params.id}.json`, {
      method: 'DELETE'
    });
    props.history.push('/posts');

  }

  const addLikes = async () => {

             const postDetails = {
              method: 'PATCH',
              body: JSON.stringify({
              likes: selectedPost.likes + 1
              }),
               headers:  {
                 "Content-type": "application/json; charset=UTF-8"
                }
              };

            //extracting the token from the newData object using context API
            const {token} = newData;
              const postRequest = await fetch(`https://blog-fa351.firebaseio.com/posts?auth=${token}/${props.match.params.id}.json`, postDetails);
              const response = await postRequest.json();
              setSelected(response);
              console.log(response, 'aqui tengo que buscar el error')

              return response.error ? setError(error) :  null;



    };

  console.log(error)


    if (error) {
      return <Redirect to="/404" />
    }

  return(
     <Card key={selectedPost.id} className="singlePost">
          <Card.Body >
           <h1>{error}</h1>
            <Card.Title> {selectedPost.title}</Card.Title>
            <p>{selectedPost.likes === 0 ? 'Be the first to like this post!' : selectedPost.likes} {selectedPost.likes ? "Times this post was liked" : null}</p>

            <Card.Text>
              the author of this post is: <strong>{selectedPost.author}</strong>
            </Card.Text>
              Category: {selectedPost.value}
             <Card.Text>
             </Card.Text>
            <Button onClick={deleteSelectedPost} variant="danger">Delete</Button>
             <Button onClick={addLikes} variant="success" style={{margin: '10px'}}>Like Post</Button>
              <Link to={`/update/post/${props.match.params.id}`} > Update Post </Link>
          </Card.Body>
        </Card>
  );

}

export default PostDetails;
