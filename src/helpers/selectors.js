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
  // console.log("from getInterview", state);
  if (interview) {
    console.log("front interview:19", state);
    const interviewObj = {
      student: interview.student,
      interviewer: {
        id: state.interviewers[interview.interviewer].id,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar,
      },
    };
    // console.log("from selector", interviewObj);
    return interviewObj;
  }
  return null;
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
