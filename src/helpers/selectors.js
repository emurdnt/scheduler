/**
 * A helper to get all the appointments of the day.
 * @param {object} state
 * @param {string} day
 * @returns {array}
 */
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

/**
 * A helper to create a new object with the 2 parameters.
 * @param {object} state
 * @param {object} interview
 * @returns {object}
 */

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
/**
 * A helper function that returns the interviewers for the day.
 * @param {object} state
 * @param {string} day
 * @returns {array}
 */
export function getInterviewersForDay(state, day) {
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
  return interviewers;
}

/**
 * A helper function to update the spots remaining by taking in the state object
 * and the new appointments object.
 * @param {object} state
 * @param {object} appointments
 * @returns {object}
 */

export function updateSpotsRemaining(state, appointments) {
  let currentDayObj;
  let daySpots = 0;
  for (let day of state.days) {
    if (day.name === state.day) {
      currentDayObj = day;
      daySpots = day.appointments.length;
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
      day.spots = daySpots - spotsFilled;
    }
    days.push(day);
  }
  return days;
}
