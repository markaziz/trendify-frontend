import React from 'react';
import './styles.css';

export default function TrackIframe(props) {
  const { albumId} = props.track;
  return (
    <div className="iframeContainer" style={props.isVisibile ? { } : { display: 'none' } }>
      <React.Fragment>
        <iframe
          className="iframe"
          src={`https://open.spotify.com/embed/album/${albumId}`}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media" />
      </React.Fragment>
    </div>
  )
}