import React, { useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "11pm",
    interview: {
      student: "Cohana Roy",
      interviewer: {
         id: 5, 
         name: "Sven Jones", 
         avatar: "https://i.imgur.com/twYrpay.jpg" 
      }
    }
  },
  {
    id: 4,
    time: "7pm", 
  },
  {
    id: 5,
    time: "2am",
    interview: {
      student: "Tori Malcolm",
      interviewer: { 
        id: 3, 
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png" 
      }
    }
  }
];



export default function Application(props) {

  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);


  const [state, setState] = useState({
    day: "",
    days: [],
    
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  
  useEffect(() => {
    axios.get('/api/days').then(resp => {
      //console.log(resp);
      setDays(resp.data)

    });
  }, []);
  
  const appointMap = appointments.map(a => {

    return (
      <Appointment 
      key = {a.id} 
      time = {a.time} {...a}
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
        <Appointment key="last" time="5pm" />
      </section>

      

    </main>
    



  );
}
