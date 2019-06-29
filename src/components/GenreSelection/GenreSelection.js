import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import GenreBlock from '../GenreBlock/GenreBlock';
import { Link } from "react-router-dom"
import Loader from '../Loader/Loader';
import getGenresToSelect from '../../constants';
import './styles.css';

export default function GenreSelection(props) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('spotifyAccessToken');

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
          localStorage.setItem('spotifyAccessToken', res.access_token);
          setLoading(false);
        }
      }).catch(err => {
        setLoading(false);
        console.log(err.message);
        window.location.href="/";
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

  return (
    <div className="outerContainer">
      <Loader loading={loading} />
      {!buttonClicked && !loading && accessToken &&
      <React.Fragment>
        <h2 className="title">Select up to 5 genres!</h2>
        <div className="genreSelectionContainer">
          {getGenresToSelect().map((g) => {
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
              pathname: '/play-genres',
              state: { accessToken, genres: selectedGenres }
            }}
            style={{ textDecoration: 'none' }}
          >
            <Button onClick={handleButton} variant="contained">Play!</Button>
            
          </Link>
        }
      </React.Fragment>
      }
    </div>
  );
}
