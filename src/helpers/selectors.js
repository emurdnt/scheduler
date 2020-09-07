export function getAppointmentsForDay(state, day) {
  const arr = state.days
    .filter((dayOfWeek) => dayOfWeek.name === day)
    .map((obj) => {
      return obj.appointments;
    })
    .reduce((acc, val) => acc.concat(val), []);

  const appointments = [];
  for (let data of arr) {
    appointments.push(state.appointments[data]);
  }
  return appointments;
}

export function getInterview(state, interview) {
  let result = {};
  for (let intObj in state.interviewers) {
    if (interview && state.interviewers[intObj].id === interview.interviewer) {
      result.student = interview.student;
      result.interviewer = state.interviewers[intObj];
    }
  }
  if (!Object.keys(result).length) {
    return null;
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  // console.log("interviewers", state);
  const arr = state.days
    .filter((dayOfWeek) => dayOfWeek.name === day)
    .map((obj) => {
      return obj.interviewers;
    })
    .reduce((acc, val) => acc.concat(val), []);

  const interviewers = [];
  for (let data of arr) {
    interviewers.push(state.interviewers[data]);
  }
  console.log(interviewers);
  return interviewers;
}

export function updateSpotsRemaining(state, appointments) {
  let currentDayObj;
  for (let day of state.days) {
    if (day.name === state.day) {
      currentDayObj = day;
    }
  }
  const apptsByDay = currentDayObj.appointments;
  let spotsFilled = 0;
  for (let appt of apptsByDay) {
    if (appointments[appt].interview) {
      spotsFilled++;
    }
  }
  let days = [];
  for (let day of state.days) {
    if (day.name === state.day) {
      day.spots = 5 - spotsFilled;
    }
    days.push(day);
  }
  return days;
}
