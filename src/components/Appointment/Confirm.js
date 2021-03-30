
import React from "react"
import "components/Appointment/styles.scss"
import Button from "components/Button";
export default function Confirm (props) {
  return (
    <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">{props.message}</h1>
        <section className="appointment__actions">
          <Button danger onClick = {props.onCancel} disabled = {false}>Cancel</Button>
          <Button danger onClick = {props.onConfirm} disabled = {false}>Confirm</Button>
        </section>
    </main>
  )
}  

