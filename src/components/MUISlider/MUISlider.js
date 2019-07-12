import React from 'react';
import { Slider } from 'material-ui-slider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '8rem'
  },
}));
export default function MUISlider(props) {
  const { value, onChange, defaultValue } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 id="slider">{value}</h1>
      <Slider
      
        aria-labelledby="slider"
        defaultValue={defaultValue}
        value={value || defaultValue}
        onChange={onChange}
        getAriaValueText={value}
        classes={{ root: "sliderRoot" }}
      />
    </div>
  );
}
