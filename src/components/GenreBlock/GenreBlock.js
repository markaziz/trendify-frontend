import React from 'react';
import './styles.css';
import Tick from '../../images/tick.png';

export default function GenreBlock(props) {
  const { genre, img, isSelected, onClick } = props

  return (
    <div
      onClick={onClick}
      className="genreBlockContainer"
      style={{
        backgroundImage: `url(${img})`,
        backgroundColor: isSelected && 'rgba(76, 76, 76, 0.2)',
      }}
    >
      <p className="genreName">{genre}</p>
      {isSelected &&
        <img
          className="selectionIndicator"
          alt="selection"
          src={Tick}
        />
      }
    </div>
  );
}
