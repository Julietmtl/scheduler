import { useState, useEffect } from 'react'
import axios from 'axios'
import { getAppointmentsForDay } from 'helpers/selectors'

export default function useApplicationData () {
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

// trying to find the day by id matched to the days[array]appointments which is an array of appointment Ids
//which will return that particular day object
  function findDay (id, days) {
    for (const day of days) {
      for (const appointmentId of day.appointments) {
        if (appointmentId === id) {
          return day;
        }
      }
    }
    return null;
  }
 

function updateSpots(id, days, appointments) {
  const foundDayWithIdInArray = findDay(id, state.days)
  
  //count all the null interview by matching the appointments interview and the day appointments array of ID
    let numberOfSpots = 0;
  for (const appointmentId of foundDayWithIdInArray.appointments) {
  //for each Id we need to count the number of empty appointments
    if(appointments[appointmentId].interview === null) {
      numberOfSpots++
    } 
  }

  // mapping the days and only changing the particular days spot count
  //matching the day with the days api with the day that the appointment was booked
  // we copy that particular day and change its spots value.
  const dayResult = state.days.map(day => { if (day.name === foundDayWithIdInArray.name) {
    return {...day, spots: numberOfSpots}
  }
  // if the name doesn't match it will just return the day object
  return day
  });
  //this is the entire array of day objects which will include the name matched and the names not matched
  return dayResult
}


  function bookInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

  
//calling the function to update Spots
 const dayArray = updateSpots(id, state.days, appointments) 

 //days: dayArray --- this is using the setState


    const url = `/api/appointments/${id}`
    return axios.put(url, {interview})
    .then(res => {
      setState({...state, appointments, days: dayArray})
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

    const dayArray = updateSpots(id, state.days, appointments) 

    let url = `/api/appointments/${id}`
    return axios.delete(url, {interview: null})
    .then(res => {
      setState({...state, appointments, days: dayArray})
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
}