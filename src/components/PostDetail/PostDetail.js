import React,{useState,useEffect} from 'react';
import { Card,Button } from 'react-bootstrap';

//everytime we link to somewhere we will get the some specific props

function PostDetails(props){

  const [selectedPost, setSelected] = useState({});

  useEffect(() => {
    fetch(`/posts/${props.match.params.id}`)
    .then(response => response.json())
    .then(data => setSelected(data))

  },[]);

  const click = () => {
    const deletePost = fetch(`/posts/${props.match.params.id}`, {
      method: 'DELETE'
    });
    props.history.push('/posts');

  }


    const addLikes = () => {

       const postDetails = {
        method: 'PUT',
        body: JSON.stringify({
          author: selectedPost.author,
          title: selectedPost.title,
         likes: selectedPost.likes + 1
        }),
        headers:  {
          "Content-type": "application/json; charset=UTF-8"
        }
      };


    const postRequest = fetch(`/posts/${props.match.params.id}`, postDetails)
    .then(response => response.json())
    .then(data => setSelected(data))
    .catch(error => console.log(error))


    };



  return(
     <Card style={{width: '38rem', display: 'flex', flexWrap: 'wrap',alingContent: 'center'}}>
          <Card.Body >
            <Card.Title> {selectedPost.title}</Card.Title>
            <p>{selectedPost.likes}</p>
            <Card.Text>
              {selectedPost.body}
            </Card.Text>
            <Button onClick={click} variant="danger">Delete</Button>
             <Button onClick={addLikes} variant="success" style={{margin: '10px'}}>Like Post</Button>
          </Card.Body>

        </Card>
  );

}

export default PostDetails;
