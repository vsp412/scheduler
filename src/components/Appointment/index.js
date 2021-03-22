import React from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return(
    <article className="appointment">
      
      <Header time = {props.time} />
      {props.interview ? <Show student = {props.interview.student} interviewer = {props.interview.interviewer}/> : <Empty />}

    </article>
  )
}