import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Card.css';

function PostsCard ({data}) {

  //deconstructing data prop object
  const {id, author, title, value} = data;

  return (

   <div className="containerBlogs">

     <Card key={id} >
              <Card.Body >
                <Card.Title>
                <Link to={`/post/${id}`}>
                  {title} </Link>
                </Card.Title>
                <p></p>
                <Card.Text>
                  Created by: {author}
                  {value}
                </Card.Text>


              </Card.Body>

            </Card>
   </div>
  );

};

export default PostsCard;
