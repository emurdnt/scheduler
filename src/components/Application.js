import React, { useState, useEffect } from "react";
import useApplicationData from "../hooks/useApplicationData";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const apptArray = getAppointmentsForDay(state, state.day);
  const interviewersArray = getInterviewersForDay(state, state.day);
  const schedule = apptArray.map((appointment) => {
    const interviewRes = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        interview={interviewRes}
        id={appointment.id}
        time={appointment.time}
        interviewers={interviewersArray}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // console.log(spotsRemaining(1));
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
