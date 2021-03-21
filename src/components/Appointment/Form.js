
import React, { useState } from 'react'
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form (props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset () {
    setName("");
    setInterviewer(null);
  }

  function cancel () {
    reset();
    props.onCancel();
  }
  function save () {
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name=""
            type="text"
            placeholder=""
            value = {name}
            onChange={(event) => setName(event.target.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} 
        onChange={setInterviewer} />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick = {cancel} >Cancel</Button>
          <Button confirm onClick = {save} >Save</Button>
        </section>
      </section>
    </main>
  )
}  
