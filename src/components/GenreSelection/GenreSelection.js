import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import GenreBlock from '../GenreBlock/GenreBlock';
import hipHopImage from '../../images/hip-hop.jpeg';
import rockImage from '../../images/rock.jpeg';
import popImage from '../../images/pop.jpg'
import rnbImage from '../../images/rnb.jpg'
import countryImage from '../../images/country.jpeg';
import { Link } from "react-router-dom"
import classicalImage from '../../images/classical.jpg'
import './styles.css';
import Loader from '../Loader/Loader';

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
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    setLoading(true);
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/getToken`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
      .then((res) => {
        if (res && res.access_token) {
          localStorage.setItem('accessToken', res.access_token);
          setLoading(false);
        }
      }).catch(err => {
        setLoading(false);
        throw(err.message)
      });
  }

  useEffect(() => {
    getToken();
  }, [])

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

  const accessToken = localStorage.getItem('accessToken');
  return (
    <div className="outerContainer">
      <Loader loading={loading} />
      {!buttonClicked && !loading && accessToken &&
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
          <Link
            to={{
              pathname: '/play',
              state: { accessToken, genres: selectedGenres }
            }}
            style={{ textDecoration: 'none' }}
          >
            <Button onClick={handleButton} classes={{ root: 'playButton' }} variant="contained">Play!</Button>
          </Link>
        }
      </React.Fragment>
      }
    </div>
  );
}
