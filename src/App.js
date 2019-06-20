import React, { Component } from 'react';
import './App.css';
import GuessPopularity from './components/GuessPopularity/GuessPopularity';
import GenreSelection from './components/GenreSelection/GenreSelection';
require('dotenv').config()

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      accessToken: '',
    }
    
    const search = window.location.search
    const accessToken = search ? new URLSearchParams(search).get('access_token') : null;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      const token = window.localStorage.getItem('accessToken');
      this.state = Object.assign({}, this.state, { isLoggedIn: true, accessToken: token })
    } else {
      this.state = Object.assign({}, this.state, { isLoggedIn: false })
    }

    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    this.setState({ loading: true });
    window.location.href= `${process.env.REACT_APP_BACKEND_URL}/login`;
  }

  render() {
    const { loading, isLoggedIn, accessToken } = this.state;
    return (
      <div className="app">
        {!isLoggedIn ?
          <div className="loginButton" onClick={this.redirectToLogin}>Log in to Spotify</div> :
          <GenreSelection accessToken={accessToken} />
          // <GuessPopularity accessToken={accessToken} />
        }
        {loading &&
          <div class="boxLoading" />
        }
      </div>
    );
  }
  
}




