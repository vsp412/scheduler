import React from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";


export default function Appointment (props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(interview);
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  const delInt = function () {
    transition(DELETE);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  // const editSave = function (name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  //   transition(SAVING);
  //   props.bookInterview(props.id, interview).then(() => transition(SHOW));
  // }

  return(
    <article className="appointment">
      
      <Header time = {props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } /> }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {() => transition(CONFIRM)}
          onEdit = {() => transition(EDIT)} 
        />
      )}
      {mode === EDIT && <Form interviewers = {props.interviewers} 
      interviewer = {props.interview.interviewer.id} name = {props.interview.student} 
      onCancel = {() => back()} onSave = {save} /> }

      {mode === CREATE && <Form interviewers = {props.interviewers} 
      onCancel = {() => back()} onSave = {save} /> }

      {mode === SAVING && <Status message = "Saving" /> }
      {mode === DELETE && <Status message = "Removing" /> }
      {mode === CONFIRM && <Confirm onConfirm = {delInt} message = "Are you sure you want to delete?" 
      onCancel = {() => back()} />}
    </article>
  )
}
//{/* {props.interview ? <Show student = {props.interview.student} interviewer = {props.interview.interviewer}/> : <Empty />} */}