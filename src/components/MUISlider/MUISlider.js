import React from 'react';
import { Slider } from 'material-ui-slider';

export default function MUISlider(props) {
  const { value, onChange, defaultValue } = props;

  return (
    <React.Fragment>
      <h1 id="slider">{value}</h1>
      <Slider
        aria-labelledby="slider"
        defaultValue={defaultValue}
        value={value || defaultValue}
        onChange={onChange}
        getAriaValueText={value}
      />
    </React.Fragment>
  );
}
