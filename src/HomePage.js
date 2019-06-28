import React from 'react'
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core';
import './HomePage.css';

export default function HomePage () {
  return (
    <div className="homeContainer">
      <h1>Guess the popularity!</h1>
      <div className="instructions">
        <div>Spotify gives each song a popularity score from 0 - 100 based on an algorithm that uses the number of times a song is played and how recently it was played.</div>
      </div>
      <Link to='/genre-selection' style={{ textDecoration: 'none', margin: 'auto 0' }}>
        <Button classes={{ root: 'loginButton' }}>Let's go!</Button>
      </Link>
    </div>
  )
}