import React from 'react';
import './Card.css';

Card.defaultProps = {
  username: '',
  image: '',
  text: ''
};

function Card({username, image, text}) {
  return (
    <div className="card">
      <div className="card__image-container">
        <img src={image} alt={`${image}'s avatar`} />
      </div>
      <div className="card__tweet-container">
        <span className="card__username">{username}</span>
        <span className="card__text">{text}</span>
      </div>
    </div>
  );
}

export default Card;