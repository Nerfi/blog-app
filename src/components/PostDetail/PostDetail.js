import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

function PostDetails(props){

  const [selectedPost, setSelected] = useState({});



  useEffect(() => {

    const selectPost = async () => {
    const fetchSinglePost = await fetch(`/posts/${props.match.params.id}`);
    const response = await fetchSinglePost.json();
    setSelected(response);

   }
    selectPost();

  },[]);

  const deleteSelectedPost = () => {
    const deletePost = fetch(`/posts/${props.match.params.id}`, {
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


    const postRequest = await fetch(`/posts/${props.match.params.id}`, postDetails);
    const response = await postRequest.json();
    setSelected(response);



    };



  return(
     <Card style={{width: '38rem', display: 'flex', flexWrap: 'wrap',alingContent: 'center'}}>
          <Card.Body >
            <Card.Title> {selectedPost.title}</Card.Title>
            <p>{selectedPost.likes <= 0 ? 'Be the first to like this post!' : selectedPost.likes}</p>
            <Card.Text>
              {selectedPost.author}
              {selectedPost.category}
            </Card.Text>
            <Button onClick={deleteSelectedPost} variant="danger">Delete</Button>
             <Button onClick={addLikes} variant="success" style={{margin: '10px'}}>Like Post</Button>
              <Link to={`/update/post/${props.match.params.id}`}> Update Post </Link>
          </Card.Body>

        </Card>
  );

}

export default PostDetails;
