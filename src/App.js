import React, { Component } from 'react';
import TrounamentContainer from './components/TrounamentContainer/TrounamentContainer';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    }
    
    const search = window.location.search
    const accessToken = search ? new URLSearchParams(search).get('access_token') : null;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      this.state = Object.assign({}, this.state, { isLoggedIn: true })
    } else {
      this.state = Object.assign({}, this.state, { isLoggedIn: false })
    }

    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    this.setState({ loading: true });
    window.location = 'http://localhost:4000/login';
  }

  render() {
    const { loading, isLoggedIn } = this.state;
    return (
      <div className="app">
        {!isLoggedIn && !loading ?
          <div className="loginButton" onClick={this.redirectToLogin}>Log in to Spotify</div> :
          <TrounamentContainer />
        }
        {loading &&
          <div class="boxLoading" />
        }
      </div>
    );
  }
  
}




