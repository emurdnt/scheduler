export default function getAppointmentsForDay(state, day) {
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

export default function getInterview(state, interview) {}
