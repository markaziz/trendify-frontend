import React, { useEffect } from 'react';
import GuessPopularity from '../GuessPopularity/GuessPopularity';

export default function MySongs(props) {

  useEffect(() => {
    if (!localStorage.getItem('spotifyAccessToken')) {
      window.location.href = '/';
    }
  })

  const location = {
    state: {
      accessToken: localStorage.getItem('spotifyAccessToken'),
      mySongs: true
    }
  }
  return (
    <div>
      <GuessPopularity location={location} />
    </div>
  );
}