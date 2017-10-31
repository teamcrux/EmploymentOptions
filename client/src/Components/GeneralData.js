import React from 'react';

const GeneralData = (props) => {
  return (
    <div>
      <h3> General </h3>
      <p> Employment Availablity: {props.user.date_avail} </p>
      <p> Worked for Military: {props.user.military} </p>
      <p> Any Misdemeanors: {props.user.misdemeanor} </p>
    </div>
  )
}

export default (GeneralData);
