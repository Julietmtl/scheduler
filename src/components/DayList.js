import React from "react";
import DayListItem from "./DayListItem.js"

export default function DayList(props) {
  console.log({ props })
  const day = props.days.map(day => <DayListItem key={day.id} {...day} />);
  console.log({ day })
  return (
    <ul className="DayList">
      {day}
    </ul>
  );
}

// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];
