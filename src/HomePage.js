import React from 'react'
import { Link } from "react-router-dom"
import Button from './components/Button/Button';
import './HomePage.css';

require('dotenv').config()

export default function HomePage () {
  return (
    <div className="homeContainer">
      <h1 className="title">Guess the popularity!</h1>
      <div className="instructions">
        <div>Spotify gives each song a popularity score from 0 - 100 based on an algorithm that uses the number of times a song is played and how recently it was played.</div>
      </div>
      <div className="buttonsContainer">
        <Link to='/genre-selection' style={{ textDecoration: 'none', margin: 'auto 0' }}>
          <Button>Random Songs</Button>
        </Link>
        <a href={`${process.env.REACT_APP_BACKEND_URL}/login`} style={{ textDecoration: 'none', margin: 'auto 0' }}>
          <Button>My Songs</Button>
        </a>
      </div>
    </div>
  )
}