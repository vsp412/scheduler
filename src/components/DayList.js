import React from "react";

import DayListItem from "./dayListItem";





export default function DayList(props) {
  const allDays = props.days.map(d => {

      return(
         <DayListItem name = {d.name} 
         spots = {d.spots} 
         selected = {d.name === props.day} 
         setDay = {(event) => props.setDay(d.name)} />
      );
  })             
      
  return (<ul>{allDays}</ul>);
}

//ReactDOM.render(<DayList day = {props.day} days = {props.days} key />, document.getElementById("root"));
