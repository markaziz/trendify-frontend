import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import './styles.css';
import TournamentManager from '../TournamentManager/TournamentManager';

async function fetchDiscoverWeekly (accessToken) {
  const res = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    mode: "cors",
  }).catch((err) => {
    console.log(err.response);
  });
  if(res && res.status === 401) {
    window.location = 'http://localhost:4000/login';
  }
  const playlistData = await res.json();
  const playlists = playlistData.items;

  // Find Discover Weekly
  const discoverWeekly = playlists.find(p => p.name === 'Discover Weekly');
  return discoverWeekly; 
}

async function fetchTracksForPlaylist(accessToken, uri) {
  const res = await fetch(`http://localhost:4000/discover-weekly?access_token=${accessToken}&uri=${uri}`, {
    mode: "cors",
  }).catch((err) => {
    console.log(err);
  });

  const tracksData = await res.json();;
  return tracksData;
}

export default class TrounamentContainer extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      accessToken: window.localStorage.getItem('accessToken'),
    };
  }

  async componentWillMount() {
    const { accessToken } = this.state;
    const discoverWeekly = await fetchDiscoverWeekly(accessToken);
    if (discoverWeekly && discoverWeekly.tracks) {
      const tracks = await fetchTracksForPlaylist(accessToken, discoverWeekly.tracks.href);
      this.setState({
        tracks,
      })
    }
  }

  render() {
    const { tracks } = this.state;
    if (isEmpty(tracks)) {
      return <span style={{ color: 'white' }}>Fetching data...</span>;
    }
    return (
      <div className="tournament">
        <TournamentManager tracks={tracks} />
      </div>
    );
  }
};