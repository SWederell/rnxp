import { useState, Fragment } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import ReleaseNoteButton from "./ReleaseNoteButton";
import ReleaseNoteTile from "./ReleaseNoteTile";

const ReleaseNote = ({ toggle, id }) => {
  const { snapshot, updateReleaseNote, getALevel } = FirebaseContext();
  const [note, setNote] = useState({ ...snapshot[id] });
  const [locked, setLocked] = useState(note.status == "complete");
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(note.name);
  const [editTime, setEditTime] = useState(note.time);

  const handleButtonClick = (carIndex) => {
    let newNote = {};
    newNote[`${id}.cars`] = [...note.cars];
    newNote[`${id}.cars`][carIndex].leftSite = !note.cars[carIndex].leftSite;

    let compCount = 0;

    newNote[`${id}.cars`].forEach((item) => {
      if (item.leftSite) {
        compCount += 1;
      }
    });
    if (compCount === newNote[`${id}.cars`].length) {
      newNote[`${id}.status`] = "complete";
    } else {
      newNote[`${id}.status`] = "valid";
    }
    updateReleaseNote(newNote);
  };

  const saveChanges = () => {
    let newNote = {};
    newNote[`${id}.name`] = editName;
    newNote[`${id}.time`] = editTime;

    updateReleaseNote(newNote);
    setEditMode(false);
    toggle();
  };

  const abort = () => {
    let newNote = {};
    newNote[`${id}.status`] = "aborted";

    updateReleaseNote(newNote);
    setEditMode(false);
    toggle();
  };

  const showEditButton = () => {
    if (getALevel() >= 5 && !editMode && note.status === "valid") {
      return <button onClick={() => setEditMode(true)}>Edit</button>;
    } else {
      return <></>;
    }
  };
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {editMode ? (
          <p>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </p>
        ) : (
          <p>Driver: {note.name}</p>
        )}
        {editMode ? (
          <p>
            <input
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              type="time"
            />
          </p>
        ) : (
          <p>Time: {note.time}</p>
        )}
      </div>
      {note.type === "transporter" && (
        <>
          <p>Transporter Reg: {note.treg}</p>
          <p>Company: {note.company}</p>
        </>
      )}
      <p>Authorised by: {note.authed}</p>
      {note.cars.map((item, index) => {
        return (
          <Fragment key={item.reg}>
            {locked ? (
              <ReleaseNoteTile
                id={id}
                index={index}
                car={item}
                disabled={note.status === "aborted"}
                handleButtonClick={handleButtonClick}
              />
            ) : (
              <ReleaseNoteButton
                id={id}
                index={index}
                car={item}
                disabled={note.status === "aborted"}
                handleButtonClick={handleButtonClick}
              />
            )}
          </Fragment>
        );
      })}
      <div>
        {showEditButton()}
        {editMode && (
          <>
            <button onClick={saveChanges}>Save</button>
            <button onClick={abort}>Abort</button>
          </>
        )}
        <button onClick={toggle}>Close</button>
      </div>
      {note.status === "aborted" && (
        <div
          style={{
            fontFamily: "serif",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-45deg) ",
            color: "#ff0000",
            fontSize: "45px",
            padding: "10px",
            backgroundColor: "#1a1a1a",
          }}
        >
          ABORTED
        </div>
      )}
    </div>
  );
};

export default ReleaseNote;
