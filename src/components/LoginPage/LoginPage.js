import { useEffect } from 'react';

export default function LoginPage(props) {
  const login = () => {
    const searchParams = props.location.search;
    if (searchParams.length && searchParams.includes('access_token')) {
      const token = new URLSearchParams(searchParams).get('access_token');
      localStorage.setItem('spotifyAccessToken', token);
      window.location.href = '/my-songs'
    }
  }

  useEffect(() => {
    login();
  }, [])

  return null;
}