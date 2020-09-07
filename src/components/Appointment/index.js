import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from ".../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  console.log("index", props.interview);
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
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onConfirm() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((response) => {
        transition(EMPTY);
      })
      .catch((err) => transition(ERROR_DELETE, true));
  }

  function onEdit() {
    transition(EDITING);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {(mode === CREATE || mode === EDITING) && (
        <Form
          name={props.interview ? props.interview.student : ""}
          interviewers={props.interviewers}
          interview={props.interview}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Cannot create appointment."} onClose={onCancel} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Cannot cancel appointment."} onClose={onCancel} />
      )}
    </article>
  );
}
