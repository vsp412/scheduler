import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {

  const dayClass1 = classNames("day-list__item",
  {
    "--selected" : props.selected === true ? true : false
  },

  {
    "--full" : (props.spots === 0) ? true : false
  }
  
  );
  
  const dayClass = dayClass1.split(' ').join('');
  
  function formatSpots (s) {
    if (s === 0) {
      return 'no spots remaining';
    }
    if (s === 1) {
      return `${s} spot remaining`;
    }

    return `${s} spots remaining`;
   
  }

  return (
    <li className = {dayClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}