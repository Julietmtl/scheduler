import React from "react";
import DayListItem from "./DayListItem.js"

export default function DayList(props) {
  console.log("in DayList.js:",props)
  //this takes the props and maps it.
  const parsedDays = props.days.map(day => <DayListItem 
    key={day.id} 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day} 
    setDay={props.setDay} 
    />);
  return (
    <ul className="DayList">
      {parsedDays}
    </ul>
  );
}
// What are the props?
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
