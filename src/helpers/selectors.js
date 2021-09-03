import DayList from "components/DayList";

export function getAppointmentsForDay(state, day) {
  let todaysAppointment = [];
  let appointmentIds;
//we need to find the day by matching with the state data by doing a loop
  for (let array in state.days) {
    if (state.days[array].name === day) {
      appointmentIds = state.days[array].appointments
    }
  }
  if (!appointmentIds) {
    return [];
  }
  if (state.days === []) {
    return [];
  }
  for (let id of appointmentIds) {
    console.log("state.appointments[id----- ", state.appointments[id])
    if (state.appointments.id = id) {
      let currentAppointment = state.appointments[id]
      console.log("currentAppointment: ", currentAppointment)
      todaysAppointment.push(currentAppointment)
      console.log({ todaysAppointment })
    }
  }
  return todaysAppointment
}