import React from 'react';
import { Card,Button } from 'react-bootstrap';
import './post.css';
import {Link} from 'react-router-dom'

  const post = (props) => {
    return (
        <Card style={{width: '38rem', display: 'flex', flexWrap: 'wrap',alingContent: 'center'}}>
          <Card.Body >
            <Card.Title>  <Link to={`/post/${props.post.id}`}> {props.post.title} </Link></Card.Title>
            <Card.Text>
              {props.post.body}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>

        </Card>

  );
}

export default post;
