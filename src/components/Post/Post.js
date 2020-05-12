import React from 'react';
import { Card,Button } from 'react-bootstrap';
import './post.css';
import {Link} from 'react-router-dom'

  const post = (props) => {

    return (
      <div className="postContainer">

          <Card className="cardContainer">
            <Card.Body >
              <Card.Title>  <Link to={`/post/${props.post.id}`}> {props.post.title} </Link>

              </Card.Title>
              <Card.Text>
                {props.post.body}
              </Card.Text>

              <Button variant="primary">Goo somewhere</Button>
            </Card.Body>

          </Card>
      </div>

  );
}

export default post;
