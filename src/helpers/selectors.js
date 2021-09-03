
export default function getAppointmentsForDay(state, day) {
  let results = [];

  //find the day that matches, return empty array if there is no day and the 
  //day does not exist
  const dayObj = state.days.find(item => item.name === day);
  if (!dayObj || !state.days.length) {
    return []
  }

  for (const id of dayObj.appointments) {
    const appointment = state.appointments[id]
    results.push(appointment)
  }
  return results;
};
