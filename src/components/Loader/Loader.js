import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import './styles.css';


export default function Loader(props) {
  const { loading } = props;
  return (
    <div className='loading'>
      <ScaleLoader
        height={50}
        width={15}
        radius={15}
        margin="5px"
        color={'#36c568'}
        loading={loading}
      />
    </div>
  )
};