

export function getAppointmentsForDay(state, day) {
  let results = [];

  //find the day that matches, return empty array if there is no day and the 
  //day does not exist
  const dayObj = state.days.find(stateDay => stateDay.name === day);
  if (!dayObj || !state.days.length) {
    return []
  }

  for (const id of dayObj.appointments) {
    const appointment = state.appointments[id]
    results.push(appointment)
  }
  return results;
};


export function getInterview(state, interview) {
  let results = {};

  if(interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer
  const interviewerObj = state.interviewers[interviewerId]
  
  results = {student: interview.student, interviewer: interviewerObj}
 
  return results;
}

export function getInterviewersForDay(state, day) {
  let interviewers = []

  const dayObj = state.days.find(item => item.name === day);
  if (!dayObj || !state.days.length) {
    return []
  }

  for (const id of dayObj.interviewers) {
    const interviewer = state.interviewers[id]
    interviewers.push(interviewer)
  }
  return interviewers;
};

// Result for getAppointmentsForDay()
// [{id: 1, time: '12pm', interview: null},
// {id: 2, time: '1pm,  interview: { student: "Archie Cohen", interviewer: 2 }

// Result for getInterview
// {student: "name", 
//interviewer: { "id": 1, "name": "Sylvia Palmer", "avatar": "https://i.imgur.com/LpaY82x.png"}