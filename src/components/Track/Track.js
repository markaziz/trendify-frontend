import React, { useState }  from 'react';
import './styles.css';
import classNames from 'classnames';
import TrackIframe from '../TrackIframe/TrackIframe';

export default function Track(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { track, isTop, isWinner, setWinner } = props;
  return (
    <div className={classNames({
      'track': track,
      'emptyTrack': !track,
      'top': isTop,
      'bottom': !isTop,
    })}>
      {track &&
        <React.Fragment>
          <img className="albumImage" src={track.albumImage.url} />
          <div className="trackText">
            <div className="name">{track.name}</div>
            <div className="artists">By {track.artists}</div>
          </div>
          <div className="actionButtons">
            <div className="action" onClick={() => setIsOpen(!isOpen)} >▶</div>
            <div
              style={isWinner ? { background: 'green' } : {} }
              className="action"
              onClick={setWinner}
              >
              ✓
            </div>
          </div>
          <TrackIframe isVisibile={isOpen} track={track} />
        </React.Fragment>
      }
    </div>
  )
};