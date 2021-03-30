//helper function to return appointments
export function getAppointmentsForDay(state, day) {
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
   const intName = state.interviewers[ID].name;
   const av = state.interviewers[interview.interviewer].avatar;
   const int = {id : ID, name : intName, avatar : av}
   const op = {
     student : stud,
     interviewer : int
   }
   return op;
}

//helper fxn to return interviewers list for the day
export function getInterviewersForDay (state, day) {
  const fDay = state.days.filter(d => d.name === day);
  if (fDay.length === 0) {
    return []
  }
  const ints = fDay[0]['interviewers'].map(a => state.interviewers[a.toString()]);
  return ints;
}
