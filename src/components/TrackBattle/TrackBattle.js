import React, { useState } from 'react';
import './styles.css';
import Track from '../Track/Track';

function BattleContent(props) {
  const { tracks, roundWinner, setRoundWinner, round, keyLabel } = props;

  if (!tracks.length) {
    return (
      <div className="emptyBattle">
        <div className="emptyTrack">{keyLabel}</div>
        {<span className="vs">VS</span>}
        <div className="emptyTrack"></div>
      </div>
    )
  }
  
  return (
    <React.Fragment>
      {tracks.map((t, index)=> {
        return (
          <div key={`trackContainer-${index}`}>
            {t ?
              <Track track={t} isWinner={t.id === roundWinner} setWinner={() => setRoundWinner(t.id)} /> :
              <div className="emptyTrack" />
            }
            {(index < tracks.length - 1) && <span key={index} className="vs">VS</span>}
          </div>
        )
      })}
    </React.Fragment>
  );
}

export default function TrackBattle(props) {
  const [roundWinner, setRoundWinner] = useState('');
  const { battleNode, onWinnerSelected } = props;

  return (
    <div className="outerContainer">
      <div className="trackContainer">
        <BattleContent
          keyLabel={props.keyLabel}
          tracks={battleNode.tracks}
          round={battleNode.round}
          roundWinner={roundWinner}
          setRoundWinner={(id) => {
            setRoundWinner(id);
            onWinnerSelected(id);
          }} />
      </div>
    </div>
  )
}