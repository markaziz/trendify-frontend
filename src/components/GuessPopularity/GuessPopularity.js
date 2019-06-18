import React, { useState, useEffect } from 'react';
import './styles.css';
import Track from '../Track/Track';
import MUISlider from '../MUISlider/MUISlider';
import Button from '@material-ui/core/Button';
import { getRandomNumber, getRandomItemsFromArray } from '../../utils';

const DEFAULT_SLIDER_VALUE = 10;
const NUM_OF_SONGS_TO_GUESS = 10;

function getRandomTrack(tracks) {
  const randNum = getRandomNumber(0, tracks.length - 1);
  return tracks.length ? tracks[randNum] : {};
}



export default function GuessPopularity(props) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [allTracks, setAllTracks] = useState([]);
  const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [hasPlayerGuessed, setHasPlayerGuessed] = useState(false);

  useEffect(() => {
    async function getTopTracks() {
      const res = await fetch(`http://${process.env.BACKEND_HOSTNAME}:${process.env.BACKEND_PORT}/toptracks?access_token=${props.accessToken}&limit=50`, {
        mode: "cors",
      }).catch((err) => {
        console.log(err);
      });
      if(res && res.status === 401) {
        window.location = `http://${process.env.BACKEND_HOSTNAME}:${process.env.BACKEND_PORT}/login`;
      }
    
      const tracksData = await res.json();
      const filteredTracks = tracksData.filter((t) => t.preview_url);
      const tracksRandomSubset = getRandomItemsFromArray(filteredTracks, NUM_OF_SONGS_TO_GUESS)
      setAllTracks(tracksRandomSubset);
      setSelectedTrack(tracksRandomSubset[0]);
  
    }
    getTopTracks();
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
    setPlayerPoints(playerPoints + (100 - Math.abs(sliderValue - popularity)));
    setHasPlayerGuessed(true);

    // Remove song from our list
    const newTracksList = allTracks.filter(t => t);
    const index = newTracksList.findIndex((t) => t.id === selectedTrack.id);
    newTracksList.splice(index, 1);
    setAllTracks(newTracksList);
  }

  const handleNext = () => {
    setSelectedTrack(getRandomTrack(allTracks));
    setHasPlayerGuessed(false);
    setSliderValue(DEFAULT_SLIDER_VALUE);
  }

  return (
    <div className="container">
      {trackComponent ?
      <React.Fragment>
        {trackComponent}
        <h1>Guess the popularity!</h1>
        <div className="instructions">
          <p>Spotify gives each song a popularity score from 0 - 100 based on an algorithm that uses the number of times a song is played and how recently it was played.</p>
        </div>
        <MUISlider value={sliderValue} onChange={(v) => setSliderValue(v)} defaultValue={DEFAULT_SLIDER_VALUE} />
        {hasPlayerGuessed ? 
          <Button onClick={handleNext} classes={{ root: 'nextButton' }} variant="contained">Next song</Button> :
          <Button onClick={handleSubmit} classes={{ root: 'submitButton' }} variant="contained">Submit guess</Button>
        }
        {hasPlayerGuessed &&
          <h3>Popularity of this song was: {selectedTrack.popularity}</h3>
        }
        <h2>Points: {playerPoints}</h2>
      </React.Fragment> :
      <h1>Game over! Points: {playerPoints}</h1>}
    </div>
  );
}

