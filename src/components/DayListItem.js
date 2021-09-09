import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (props) => {
    if (props.spots === 0) {
      return (<h3>no spots remaining </h3>)
    } else {
      return (<h3>{props.spots} {props.spots>1?"spots":"spot"} remaining </h3>)
      // if props.spots>1 return spots else spot 
    }
  };  

  return (
    <li className={dayClass} data-testid='day' onClick={() => props.setDay(props.name) }>
      <h2 >{props.name}</h2>
      {formatSpots(props)}
    </li>
  );
}