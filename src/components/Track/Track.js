import React from 'react';
import './styles.css';
import ReactAudioPlayer from 'react-audio-player';


export default function Track(props) {
  const { name, artists, image, preview_url } = props;
  return (
    <div className="trackContainer">
      <div className="track">
        <img src={image} alt={image} />
        <div className="trackInfo">
          <span className="name">{name}</span>
          <span className="artists">{artists.map(a => a.name).join(', ')}</span>
        </div>
      </div>
      <ReactAudioPlayer
        src={preview_url}
        controls
        controlsList="nodownload"
      />
    </div>
  )
};