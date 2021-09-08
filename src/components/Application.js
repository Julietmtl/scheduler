import React, { useState, useEffect } from 'react'
import DayList from './DayList.js'
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from 'helpers/selectors.js'

import 'components/Application.scss'
import Appointment from './Appointment/index'
import useApplicationData from 'hooks/useApplicationData.js'

export default function Application (props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const interviewersForDay = getInterviewersForDay(state, state.day)

  const appointmentsForDay = getAppointmentsForDay(state, state.day)

  const appointmentList = appointmentsForDay.map(appointment => {
    const interview = getInterview(state, appointment.interview)

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
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointmentList}
        <Appointment key="last" time='5pm' />
      </section>
    </main>
  )
}
