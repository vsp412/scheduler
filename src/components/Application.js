import React from "react";


import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {


  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointMap = dailyAppointments.map(a => {

      const interview = getInterview(state, a.interview);
      

      return (
        <Appointment 
        key = {a.id} 
        id = {a.id}
        time = {a.time} 
        interview = {interview}
        interviewers = {dailyInterviewers}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
        />
      );
  });

  

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
