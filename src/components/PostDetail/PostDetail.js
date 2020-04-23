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

  //
  const click = () => {
    const deletePost = fetch(`/posts/${props.match.params.id}`, {
      method: 'DELETE'
    });
    props.history.push('/posts');
    window.alert(`post wit id ${props.match.params.id} was Delete`)
  }

  return(
     <Card style={{width: '38rem', display: 'flex', flexWrap: 'wrap',alingContent: 'center'}}>
          <Card.Body >
            <Card.Title> {selectedPost.title}</Card.Title>
            <Card.Text>
              {selectedPost.body}
            </Card.Text>
            <Button onClick={click} variant="danger">Delete</Button>
          </Card.Body>

        </Card>
  );

}

export default PostDetails;
