import React, { useState, useEffect} from "react";
import axios from "axios";

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const fDay = state.days.filter(d => d.name === day);

  if (fDay.length === 0) {
    return []
  }
  
  const apps = fDay[0]['appointments'].map(a => state.appointments[a.toString()]);

  return apps;
}