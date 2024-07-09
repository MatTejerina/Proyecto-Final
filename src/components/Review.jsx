import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import '../styles/Review.css';

const Review = ({ avatar, name, rating, comment, color }) => {
  const stars = Array(5).fill(0).map((_, index) => (
    <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
  ));

  return (
    <Card className="mb-3" style={{ borderColor: color }}>
      <Card.Body className="d-flex">
        <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <div className="content ms-3">
          <Card.Title>{name}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="stars">{stars}</ListGroupItem>
            <ListGroupItem>{comment}</ListGroupItem>
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Review;
