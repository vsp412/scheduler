import {useState, useEffect, useReducer} from "react";
import axios from "axios";
export default function useApplicationData () {
  console.log("lalalalasdcaala")

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })


  function reducer(state, action) {
    if (action.type === 'SET_DAY') {
      return { ...state, day: action.day }
  
    } else if (action.type === 'SET_INTERVIEW') {
  
    } else if (action.type === 'SET_APPLICATION_DATA') {
      console.log("plplplplplplppl")
  //return state + action.days + action.appointments + action.interviewers
      return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}

  
    } else {
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    }     
  }
  
  const setDay = function (day) {
    dispatch({ type: SET_DAY, day: day })
  }

  //handles the booking/updation of an appointment/interview
  const bookInterview = function (id, interview) {
      dispatch({ type: SET_INTERVIEW, id: id, interview: interview });
  }
  
  //handles fxn to cancel an interview/appointment
  const cancelInterview = function (id) {
      dispatch({ type: SET_INTERVIEW, id: id, interview: null });
  }
   

  //set initial state with data responses from REST API calls
  useEffect(() => {
    console.log("ASdadas")
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
     
      console.log(all)
      let days = all[0].data
      let appointments  = all[1].data 
      let interviewers = all[2].data
      console.log(days)
      dispatch({ type: SET_APPLICATION_DATA, days: days, appointments: appointments, interviewers: interviewers });
    })
  }, []);

  return {state, setDay, bookInterview, cancelInterview}

}





// import {useState, useEffect} from "react";
// import axios from "axios";
// export default function useApplicationData () {
//   const [state, setState] = useState({
    // day: "Monday",
    // days: [],
    // appointments: {},
    // interviewers: {}
//   });



//   const setDay = day => setState({ ...state, day });

//   //handles the booking/updation of an appointment/interview
//   const bookInterview = function (id, interview) {
//    const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview }
//    };
//    const appointments = {
//     ...state.appointments,
//     [id]: appointment
//    };

//    //code to update no of spots
//    const daysSave = [ ...state.days ];
//    daysSave.forEach(d => d.appointments.includes(id) ? d.spots-- : d.spots);
//    return axios.put(`/api/appointments/${id}`, {interview})
//    .then(res => {
//      setState({
//       ...state,
//       appointments
//      });
//    })
//   }

//   //handles fxn to cancel an interview/appointment
//   const cancelInterview = function (id) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     }; 
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     //code to update no of spots
//     const daysDel = [ ...state.days ];
//     daysDel.forEach(d => d.appointments.includes(id) ? d.spots++ : d.spots);
//     return axios.delete(`/api/appointments/${id}`)
//     .then(res => {
//      setState({
//       ...state,
//       appointments
//      });
//     })
//   }

//   //set initial state with data responses from REST API calls
//   useEffect(() => {
//     Promise.all([
//       axios.get('/api/days'),
//       axios.get('/api/appointments'),
//       axios.get('/api/interviewers')
//     ]).then((all) => {
//       console.log(all)
//       setState(prev => 
//         ({
//           ...prev,
//           days: all[0].data,
//           appointments: all[1].data,
//           interviewers: all[2].data 
//         })
//       )
//     })
//   }, []);
//   return {state, setDay, bookInterview, cancelInterview};
// }
