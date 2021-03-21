import React from "react"
import "components/Appointment/styles.scss"

export default function Status (props) {
  return (
    <main className = "appointment__card--status">
      
          
         <img
            className="appointment__status-image"
            src="images/status.png"
            alt="waiting"
          />
          <h2 className="text--regular">{props.message}</h2>
    </main>
  )
}  



