import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import GuessPopularity from '../GuessPopularity/GuessPopularity';
import GenreBlock from '../GenreBlock/GenreBlock';
import hipHopImage from '../../images/hip-hop.jpeg';
import rockImage from '../../images/rock.jpeg';
import popImage from '../../images/pop.jpg'
import rnbImage from '../../images/rnb.jpg'
import countryImage from '../../images/country.jpeg';
import classicalImage from '../../images/classical.jpg'
import './styles.css';

const genresToSelectFrom = [
  {
    label: 'Hip hop',
    value: 'hip-hop',
    img: hipHopImage,
  },
  {
    label: 'Rock',
    value: 'rock',
    img: rockImage,
  },
  {
    label: 'Pop',
    value: 'pop',
    img: popImage,
  },
  {
    label: 'R&B',
    value: 'r-n-b',
    img: rnbImage ,
  },
  {
    label: 'Country',
    value: 'country',
    img: countryImage,
  },
  {
    label: 'Classical',
    value: 'classical',
    img: classicalImage,
  },
]

export default function GenreSelection(props) {
const [selectedGenres, setSelectedGenres] = useState([]);
const [buttonClicked, setButtonClicked] = useState(false);

const handleGenreSelection = (genre) => {
  let currentSelectionCopy = selectedGenres.map(g => g);
  if (selectedGenres.includes(genre)) {
    const index = selectedGenres.indexOf(genre);
    currentSelectionCopy.splice(index, 1);
    setSelectedGenres(currentSelectionCopy);
    return;
  }
  if (selectedGenres.length >= 5) {
    return;
  }
  setSelectedGenres(currentSelectionCopy.concat([genre]));
}

const handleButton = () => {
  setButtonClicked(true);
}
  return (
    <div className="outerContainer">
      {!buttonClicked &&
      <React.Fragment>
        <h2>Select up to 5 genres!</h2>
        <div className="genreSelectionContainer">
          {genresToSelectFrom.map((g) => {
              return (
                <GenreBlock
                  onClick={() => { handleGenreSelection(g.value) }}
                  key={g.value}
                  genre={g.label}
                  img={g.img}
                  isSelected={selectedGenres.includes(g.value)}
                />
              );
          })}
        </div>
        {selectedGenres.length > 0 && 
          <Button onClick={handleButton} classes={{ root: 'playButton' }} variant="contained">Play!</Button>
        }
      </React.Fragment>
      }
      {buttonClicked && selectedGenres.length > 0 &&
        <GuessPopularity accessToken={props.accessToken} genres={selectedGenres}/>
      }
    </div>
  );
}
