import React from 'react';
import { Progress } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export default function ScoreProgress() {

  const score = [
    'success',
    'success',
    'warning',
    'danger',
    'success',
    'danger',
    'danger',
    'success',
    'success',
    'success',
  ]

  return (
    <Progress className="outerBar" multi max={100}>
      {score.map((s, i) => {
        return <Progress key={i} bar barClassName="bar" color={s} value="10" />
      })}
    </Progress>
  )
}