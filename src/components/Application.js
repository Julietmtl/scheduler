import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DayList from './DayList.js'
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from 'helpers/selectors.js'

import 'components/Application.scss'
import Appointment from './Appointment/index'

export default function Application (props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day })

  useEffect(() => {
    const daysURL = '/api/days'
    const appointmentsURL = '/api/appointments'
    const interviewersURL = '/api/interviewers'

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then(all => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data

      setState(prev => ({ ...prev, days, appointments, interviewers }))
    })
  }, [])

  function bookInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    

    const url = `/api/appointments/${id}`
    return axios.put(url, {interview})
    .then(res => {
      setState({...state, appointments})
    })
  }

  function cancelInterview (id) {
  
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments, 
      [id]: appointment
    };

    const spots = {}

    let url = `/api/appointments/${id}`
    
    return axios.delete(url, {interview: null})
    .then(res => {
      setState({...state, appointments})
    })
  }

  const interviewersForDay = getInterviewersForDay(state, state.day)

  const appointmentsForDay = getAppointmentsForDay(state, state.day)

  const appointmentList = appointmentsForDay.map(appointment => {
    const interview = getInterview(state, appointment.interview)

    console.log('appointment---in application.js: ', appointment)

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  console.log('interviewersForDay---', interviewersForDay)
  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} day={state.day} setDay={setDay} />
          {/* <InterviewList
            interviewers={interviewers}
            interviewer={interviewer}
            setInterviewer={setInterviewer}
          /> */}
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointmentList}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  )
}
