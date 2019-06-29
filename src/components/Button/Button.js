import React from 'react';
import { Button } from '@material-ui/core';
import './styles.css';

export default function CustomButton(props) {
  return (
    <Button {...props} classes={{ root: 'button' }}>
      {props.children}
    </Button>
  );
}