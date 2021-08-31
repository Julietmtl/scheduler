import React from "react";
import "components/DayListItem.scss";
var classNames = require('classnames');


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (props) => {
    if (props.spots === 0) {
      return (<h3>no spots remaining </h3>)
    }
    if (props.spots === 1) {
      return (<h3>{props.spots} spot remaining </h3>)
    }
      return (<h3>{props.spots} spots remaining </h3>)
  };  

  console.log({dayClass})

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2>
      {formatSpots(props)}
    </li>
  );
}