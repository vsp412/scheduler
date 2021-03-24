import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData () {
  
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
    
  });

 
  
  const setDay = day => setState({ ...state, day });

  const bookInterview = function (id, interview) {

   const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
   };

   const appointments = {
    ...state.appointments,
    [id]: appointment
   };

   //code to update no of spots
   const daysSave = [ ...state.days ];
   daysSave.forEach(d => d.appointments.includes(id) ? d.spots-- : d.spots);
   
   return axios.put(`/api/appointments/${id}`, {interview})
   .then(res => {
     setState({
      ...state,
      appointments
     });
   })
   


  }

  const cancelInterview = function (id) {
    

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //code to update no of spots
    const daysDel = [ ...state.days ];
    daysDel.forEach(d => d.appointments.includes(id) ? d.spots++ : d.spots);

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
     setState({
      ...state,
      appointments
     });
    })
  
  }

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

  return {state, setDay, bookInterview, cancelInterview};


}