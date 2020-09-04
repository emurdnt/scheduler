import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from ".../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const ERROR = "ERROR";

export default function Appointment(props) {
  // console.log("index", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }

  function onCancel() {
    back();
  }

  function onSave(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    const id = props.id;
    props.bookInterview(id, interview).then((response) => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // onEdit={props.onEdit}
          // onDelete={props.onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
    </article>
  );
}
