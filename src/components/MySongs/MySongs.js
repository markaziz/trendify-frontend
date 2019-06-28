import React, { useEffect } from 'react';
import GuessPopularity from '../GuessPopularity/GuessPopularity';

export default function MySongs(props) {
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