import React, { Component } from 'react';
import './App.css';
import GenreSelection from './components/GenreSelection/GenreSelection';
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from './HomePage';
import GuessPopularity from './components/GuessPopularity/GuessPopularity';
import LoginPage from './components/LoginPage/LoginPage';
import MySongs from './components/MySongs/MySongs';

export default function App () {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={HomePage} />
        <Route path="/genre-selection" component={GenreSelection} />
        <Route path="/play-genres" component={GuessPopularity} />
        <Route path="/token" component={LoginPage} />
        <Route path="/my-songs" component={MySongs} />
      </div>
    </Router>
  );
}
