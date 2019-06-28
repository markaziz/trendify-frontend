import React from 'react';
import './styles.css';

export default function GenreBlock(props) {
  const { genre, img, isSelected, onClick } = props

  return (
    <div onClick={onClick} className="genreBlockContainer" style={{ backgroundImage: `url(${img})` }}>
      <p className="genreName">{genre}</p>
      {isSelected && <div className="selectionIndicator">✓</div>}
    </div>
  );
}
