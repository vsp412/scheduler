import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
export default function Application(props) {

  //state
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

  //fetch appointments and interviewer list for that particular day
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  //list all appointments, pass this into the appointment component
  const appointMap = appointments.map(a => {
      const interview = getInterview(state, a.interview);
      return (
        <Appointment 
        key = {a.id} 
        id = {a.id}
        time = {a.time} 
        interview = {interview}
        interviewers = {interviewers}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
        />
      );
  });

  //main component render
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          key = {Math.random(1)}
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />   
      </section>
      <section className="schedule">
        {appointMap}
        <Appointment key="last" time="5pm"  />     
      </section>
    </main>
  );
}
