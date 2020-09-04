import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
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

    setState({
      ...state,
      appointments,
    });
    console.log(appointments);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
        });
      })
      .catch((error) => console.log(error));
  };
  console.log("interviewers", state.interviewers);
  const apptArray = getAppointmentsForDay(state, state.day);
  const interviewersArray = getInterviewersForDay(state, state.day);
  const schedule = apptArray.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    if (interview) {
      return (
        <Appointment
          key={appointment.id}
          interview={interview}
          {...appointment}
          interviewers={interviewersArray}
          bookInterview={bookInterview}
        />
      );
    } else {
      console.log("null");
    }
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule} <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
