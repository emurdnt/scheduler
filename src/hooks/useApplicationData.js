import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateSpotsRemaining } from "helpers/selectors";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const daysPromise = axios.get("/api/days");
  const interviewPromise = axios.get("/api/appointments");
  const interviewersPromise = axios.get("/api/interviewers");

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([daysPromise, interviewPromise, interviewersPromise]).then(
      (all) => {
        let [days, appointments, interviewers] = all;
        days = days.data;
        appointments = appointments.data;
        interviewers = interviewers.data;

        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      }
    );
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response, reject) => {
        const days = updateSpotsRemaining(state, appointments);
        setState({
          ...state,
          appointments,
          days,
        });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const days = updateSpotsRemaining(state, appointments);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
