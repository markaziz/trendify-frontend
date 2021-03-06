import hipHopImage from './images/hip-hop.jpeg';
import rockImage from './images/rock.jpeg';
import popImage from './images/pop.jpg'
import rnbImage from './images/rnb.jpg'
import countryImage from './images/country.jpeg';
import jazzImage from './images/jazz.jpeg';
import edmImage from './images/edm.jpg';
import technoImage from './images/techno.jpg';
import danceImage from './images/dance.jpg';
import indieImage from './images/indie.jpg';
import classicalImage from './images/classical.jpg'
import kpopImage from './images/kpop.jpg'

export default function genresToSelectFrom() {
  return [
    {
      label: 'Hip hop',
      value: 'hip-hop',
      img: hipHopImage,
    },
    {
      label: 'Rock',
      value: 'rock',
      img: rockImage,
    },
    {
      label: 'Pop',
      value: 'pop',
      img: popImage,
    },
    {
      label: 'R&B',
      value: 'r-n-b',
      img: rnbImage ,
    },
    {
      label: 'Country',
      value: 'country',
      img: countryImage,
    },
    {
      label: 'Classical',
      value: 'classical',
      img: classicalImage,
    },
    {
      label: 'Jazz',
      value: 'jazz',
      img: jazzImage,
    },
    {
      label: 'EDM',
      value: 'edm',
      img: edmImage,
    },
    {
      label: 'Techno',
      value: 'techno',
      img: technoImage,
    },
    {
      label: 'Indie',
      value: 'indie',
      img: indieImage,
    },
    {
      label: 'Dance',
      value: 'dance',
      img: danceImage,
    },
    {
      label: 'K-Pop',
      value: 'k-pop',
      img: kpopImage,
    },
  ];
}