import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList.js"
import InterviewList from "./InterviewerList.js"

import "components/Application.scss";
import Appointment from "./Appointment/index";

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
    time: "2pm",
    interview: {
      student: "Jane Doe",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];


const individualAppointments = (appointments) => {
  return appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
    //no need for an if statement on line 68 because spread appointment will only show values but if no value it will be undefined.
    // <Appointment 
    // key={appointment.id} 
    // id={appointment.id} 
    // time={appointment.time}
    // interview={ appointment.interview ? {student: appointment.interview.student, interviewer: appointment.interview.interviewer } : undefined }
    // />
  })
}

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  
  useEffect(() => {
    const daysURL = 'http://localhost:8001/api/days';
    axios.get(daysURL).then(response => {
    setDay(...response.data)
    });
  }, []);


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
        {individualAppointments(appointments)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

