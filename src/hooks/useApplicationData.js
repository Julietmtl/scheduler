import React from 'react';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewersForDay = getInterviewersForDay(state, state.day);
  
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