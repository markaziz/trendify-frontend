import React from 'react';
import { Slider } from 'material-ui-slider';

export default function MUISlider(props) {
  const { value, onChange, defaultValue } = props;

  return (
    <React.Fragment>
      <h1>{value}</h1>
      <Slider defaultValue={defaultValue} value={value || defaultValue} onChange={onChange} />
    </React.Fragment>
  );
}
