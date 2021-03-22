import React, { useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {


  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
    
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({ ...state, day });

  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => 
        ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data 
        })
      )
    })
   
  }, []);
  console.log(state.appointments);
  console.log(state.interviewers);

 
  const bookInterview = function (id, interview) {
   console.log(id, interview);
   console.log("@@@@@@@@@@@@@@@@@@");

   const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
   };

   const appointments = {
    ...state.appointments,
    [id]: appointment
   };
   

  //  setState({
  //   ...state,
  //   appointments
  //  });

   console.log("qqqqqqqqqqqqqqqqqqqqqq")
   console.log(state.appointments);
   console.log("qqqqqqqqqqqqqqqqqqqqqq")

   return axios.put(`/api/appointments/${id}`, {interview})
   .then(res => {
     setState({
      ...state,
      appointments
     });
   })

   

  }

  const appointMap = dailyAppointments.map(a => {

      const interview = getInterview(state, a.interview);
      console.log(a)
      console.log("Ooooooooooooooooooooooooooooooo");

      return (
        <Appointment 
        key = {a.id} 
        id = {a.id}
        time = {a.time} 
        interview = {interview}
        interviewers = {dailyInterviewers}
        bookInterview = {bookInterview}
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
