import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import GuessPopularity from '../GuessPopularity/GuessPopularity';

const genresToSelectFrom = [
  {
    label: 'Hip hop',
    value: 'hip-hop'
  },
  {
    label: 'Rock',
    value: 'rock'
  },
  {
    label: 'Pop',
    value: 'pop'
  },
  {
    label: 'R&B',
    value: 'r-n-b'
  },
  {
    label: 'Country',
    value: 'country'
  },
]

export default function GenreSelection(props) {
const [selectedGenre, setSelectedGenre] = useState('hip-hop');
const [buttonClicked, setButtonClicked] = useState(false);

const handleChange = (event) => {
  setSelectedGenre(event.target.value);
}

const handleButton = () => {
  setButtonClicked(true);
}
  return (
    <div>
      {!buttonClicked &&
      <React.Fragment>
        <select onChange={handleChange}>
          {genresToSelectFrom.map(g => {
            return <option key={g.value} value={g.value}>{g.label}</option>
          })}
        </select>
        <Button onClick={handleButton} variant="contained">Select</Button>
      </React.Fragment>
      }
      {buttonClicked && selectedGenre &&
        <GuessPopularity accessToken={props.accessToken} genre={selectedGenre}/>
      }
    </div>
  );
}
