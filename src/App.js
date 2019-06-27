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
    
    // const search = window.location.search
    // const accessToken = search ? new URLSearchParams(search).get('access_token') : null;
    // if (accessToken) {
    //   localStorage.setItem('accessToken', accessToken);
    //   const token = window.localStorage.getItem('accessToken');
    //   this.state = Object.assign({}, this.state, { isLoggedIn: true, accessToken: token })
    //   window.history.replaceState({}, '' , '/' );
    // } else {
    //   this.state = Object.assign({}, this.state, { isLoggedIn: false })
    // }

    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  async redirectToLogin() {
    // this.setState({ loading: true });
    // window.location.href= `${process.env.REACT_APP_BACKEND_URL}/login`;
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/getToken`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then((res) => {
      if (res && res.access_token) {
        this.setState({ accessToken: res.access_token });
      }
    }).catch(err => {
      throw(err.message)
    });
    // window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:4040/callback`;
  }

  render() {
    const { loading, isLoggedIn, accessToken } = this.state;
    return (
      <div className="app">
        {!accessToken ?
          <div className="loginButton" onClick={this.redirectToLogin}>Play</div> :
          <GenreSelection accessToken={accessToken} />
          // <GuessPopularity accessToken={accessToken} />
        }
        {loading &&
          <div className="boxLoading" />
        }
      </div>
    );
  }
  
}




