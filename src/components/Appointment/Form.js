import React, { useState } from 'react'
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
export default function Form (props) {

  //state
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  //function to reset the data for deletion purposes
  function reset () {
    setName("");
    setInterviewer(null);
  }

  //initiator function for deleting data
  function cancel () {
    reset();
    props.onCancel();
  }

  //initiator function to validate the data
  function save () {
    validate();
  }

  //function to validate and save data
  const validate = function () {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } 
    setError("");
    props.onSave(name, interviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            value = {name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
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

