import React, { useState, useEffect } from 'react';
import './styles.css';
import Track from '../Track/Track';
import MUISlider from '../MUISlider/MUISlider';
import Button from '../Button/Button';
import { getRandomNumber, getRandomItemsFromArray } from '../../utils';


const DEFAULT_SLIDER_VALUE = 10;
const POINTS_MULTIPLIER = 100;
const NUM_OF_SONGS_TO_GUESS = 10;
const API = process.env.REACT_APP_BACKEND_URL;

function getRandomTrack(tracks) {
  const randNum = getRandomNumber(0, tracks.length - 1);
  return tracks.length ? tracks[randNum] : {};
}

export default function GuessPopularity(props) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [guessesRemaining, setGuessesRemaining] = useState(NUM_OF_SONGS_TO_GUESS);
  const [allTracks, setAllTracks] = useState([]);
  const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [hasPlayerGuessed, setHasPlayerGuessed] = useState(false);

  if (!props.location.state) {
    window.location.href = '/';
  }
  const { accessToken, genres, mySongs } = props.location.state;

  useEffect(() => {
    async function getTracks() {
      let res;
      if (mySongs) {
        res = await fetch(`${API}/mySongs?access_token=${accessToken}&limit=50`, {})
        .catch((err) => {
          console.log(err);
        });
      } else {
        res = await fetch(`${API}/getRecommendations?access_token=${accessToken}&genres=${genres.join(',')}`, {})
        .catch((err) => {
          console.log(err);
        });
      }
      if(res && res.status === 401) {
        window.location.href = `${API}/login`;
      }
    
      if (res) {
        let tracksData;
        tracksData = await res.json();
        const filteredTracks = tracksData.filter((t) => t.preview_url);
        const tracksRandomSubset = getRandomItemsFromArray(filteredTracks, NUM_OF_SONGS_TO_GUESS)
        setAllTracks(tracksRandomSubset);
        setSelectedTrack(tracksRandomSubset[0]);
      }
  
    }
    getTracks();
  }, [])

  let trackComponent;

  if (selectedTrack && selectedTrack.id) {
    const { id, name, artists, album, preview_url } = selectedTrack;
    let image = '';
    if (album) {
      image = album.images && album.images.length ? album.images[0].url : null;
    }
    trackComponent = 
    <Track
      key={id}
      name={name}
      image={image}
      artists={artists}
      preview_url={preview_url}
    />;
  }

  if(!selectedTrack) {
    return null;
  }

  const handleSubmit = () => {
    const popularity = parseInt(selectedTrack.popularity, 10);
    setPlayerPoints(playerPoints + (POINTS_MULTIPLIER - Math.abs(sliderValue - popularity)));
    setHasPlayerGuessed(true);

    // Remove song from our list
    const newTracksList = allTracks.filter(t => t);
    const index = newTracksList.findIndex((t) => t.id === selectedTrack.id);
    newTracksList.splice(index, 1);
    setAllTracks(newTracksList);
    setGuessesRemaining(guessesRemaining - 1);
  }

  const handleNext = () => {
    setSelectedTrack(getRandomTrack(allTracks));
    setHasPlayerGuessed(false);
    setSliderValue(DEFAULT_SLIDER_VALUE);
  }

  const nextButtonText = guessesRemaining > 0 ? 'Next song' : 'End game';

  return (
    <div className="container">
      {trackComponent ?
      <React.Fragment>
        <h1>Guess the popularity!</h1>
        {trackComponent}
        <MUISlider value={sliderValue} onChange={(v) => setSliderValue(v)} defaultValue={DEFAULT_SLIDER_VALUE} />
        {hasPlayerGuessed ? 
          <Button onClick={handleNext} variant="contained">{nextButtonText}</Button> :
          <Button onClick={handleSubmit} classes={{ root: 'submitButton' }} variant="contained">Submit guess</Button>
        }
        <div className='actualPopularity'>{hasPlayerGuessed && `Popularity of this song was: ${selectedTrack.popularity}`}</div >
        <div className="points">Points: {playerPoints}</div>
      </React.Fragment> :
      <React.Fragment>
        <h1>Game over! Points: {playerPoints}/{NUM_OF_SONGS_TO_GUESS * POINTS_MULTIPLIER}</h1>
        <Button onClick={() => { window.location.reload(); }} variant="contained">Play again!</Button>
      </React.Fragment>}
    </div>
  );
}

