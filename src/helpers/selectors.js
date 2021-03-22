import React, { useState, useEffect} from "react";
import axios from "axios";


//helper function to return appointments
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const fDay = state.days.filter(d => d.name === day);

  if (fDay.length === 0) {
    return []
  }

  const apps = fDay[0]['appointments'].map(a => state.appointments[a.toString()]);

  return apps;
}

//helper function to return interview 
export function getInterview(state, interview) {
   
   if (interview === null || interview === undefined) {
     return null;
   }

   const stud = interview.student;
   const ID = interview.interviewer;
   const intName = state.interviewers[ID.toString()].name;
   const av = state.interviewers[interview.interviewer].avatar;
   const int = {id : ID, name : intName, avatar : av}
   const op = {
     student : stud,
     interviewer : int
   }

   return op;

}

// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }