import React from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


export default function Appointment (props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }

  const delInt = function () {
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }



  return(
    <article className="appointment">
      
      <Header time = {props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } /> }
      {mode === SHOW && 
         (<Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {() => transition(CONFIRM)}
          onEdit = {() => transition(EDIT)} />
         )
      }
      {mode === EDIT && 
        (<Form interviewers = {props.interviewers} 
        interviewer = {props.interview.interviewer.id} name = {props.interview.student} 
        onCancel = {() => back()} onSave = {save} />
        )
      }

      {mode === CREATE && 
        (<Form interviewers = {props.interviewers} 
         onCancel = {() => back()} onSave = {save} />
        )
      }

      {mode === SAVING && <Status message = "Saving" /> }
      {mode === DELETE && <Status message = "Removing" /> }
      {mode === CONFIRM && <Confirm onConfirm = {delInt} message = "Are you sure you want to delete?" 
      onCancel = {() => back()} />}

      {mode === ERROR_SAVE && <Error message  = "Could not save appointment" 
      onClose = {() => back()}
      />}
      {mode === ERROR_DELETE && <Error message  = "Could not delete appointment" 
      onClose = {() => back()}
      />}
    </article>
  )
}
//{/* {props.interview ? <Show student = {props.interview.student} interviewer = {props.interview.interviewer}/> : <Empty />} */}