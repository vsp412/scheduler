import React from "react";
import DayListItem from "./dayListItem";
export default function DayList(props) {
  const allDays = props.days.map(d => {
      return(
         <DayListItem key = {d.id} name = {d.name} 
         spots = {d.spots} 
         selected = {d.name === props.day} 
         setDay = {(event) => props.setDay(d.name)} />
      );
  })               
  return (<ul>{allDays}</ul>);
}