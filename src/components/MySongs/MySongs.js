import React, { useEffect } from 'react';
import GuessPopularity from '../GuessPopularity/GuessPopularity';

export default function MySongs(props) {

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      window.location.href = '/';
    }
  })

  const location = {
    state: {
      accessToken: localStorage.getItem('accessToken'),
      mySongs: true
    }
  }
  return (
    <div>
      <GuessPopularity location={location} />
    </div>
  );
}