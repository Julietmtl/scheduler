import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList.js"
import getAppointmentsForDay from "helpers/selectors.js";

import "components/Application.scss";
import Appointment from "./Appointment/index";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysURL = '/api/days';
    const appointmentsURL = '/api/appointments';
    const interviewersURL = '/api/interviewers';
    
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState(prev => ({ ...prev, days, appointments, interviewers}))
    });
  }, []);

  console.log("state.days:", state.days)

const appointmentsForDay = getAppointmentsForDay(state, state.day)

const appointmentList = appointmentsForDay.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} /> 
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
          {/* <InterviewList
            interviewers={interviewers}
            interviewer={interviewer}
            setInterviewer={setInterviewer}
          /> */}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

