import React from "react"
import "components/interviewListItem.scss"
const classNames = require('classnames');

export default function InterviewerListItem (props) {

   const outerClass = classNames(
      "interviewers__item",
      {"--selected" : props.selected}
   );

   const innerClass = classNames(
      "interviewers__item-image",
      {"--selected" : props.selected}
   );

   const oClass = outerClass.split(' ').join('')
   const iClass = innerClass.split(' ').join('')


   return (
   <li onClick = {props.setInterviewer} className={oClass}>
      <img
        className={iClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
   </li>
   );
  

}