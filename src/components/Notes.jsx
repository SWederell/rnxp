import { useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { AddNoteFormik, NoteListItem, ReleaseNote } from "./";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import BulkImport from "./BulkImport";

const Notes = () => {
  const { snapshot, snapshotDate, setSnapshotDate } = FirebaseContext();
  const [noteShown, noteToggle] = useModal();
  const [addNoteShown, addNoteToggle] = useModal();
  const [filterReg, setFilterReg] = useState("");
  const [modalReg, setModalReg] = useState("");

  const filteredNoteData = snapshot.ids.filter((id) => {
    let item = snapshot[id];
    let ret = false;
    if (item?.reg?.toLowerCase().includes(filterReg.toLowerCase())) {
      ret = true;
    }
    for (let i = 0; i < item.cars.length; i++) {
      if (item.cars[i].reg.toLowerCase().includes(filterReg.toLowerCase())) {
        ret = true;
      }
    }

    if (item.name.toLowerCase().includes(filterReg.toLowerCase())) {
      ret = true;
    }

    return ret;
  });

  return (
    <div style={Styles.container}>
      <Modal shown={addNoteShown} toggle={addNoteToggle}>
        <BulkImport toggle={addNoteToggle} />
        <div
          style={{
            width: "80%",
            borderBottom: "1px solid white",
            margin: "0px auto",
          }}
        />
        <AddNoteFormik toggle={addNoteToggle} />
      </Modal>
      <div
        style={{
          margin: "10px 0px",
        }}
      >
        <button onClick={addNoteToggle}>Add Release Note</button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="date"
          style={{ width: "150px" }}
          value={snapshotDate}
          onChange={(e) => setSnapshotDate(e.target.value)}
        />
        <p style={{ fontSize: "2em", lineHeight: "1.2em", margin: "10px 0px" }}>
          Release Notes for {new Date(snapshotDate).toLocaleDateString()}
        </p>
      </div>
      <div style={Styles.filterContainer}>
        <input
          style={Styles.filterBar}
          onChange={(e) => {
            setFilterReg(e.target.value);
          }}
          value={filterReg}
          maxLength={7}
          placeholder="Filter"
        />
      </div>
      {filteredNoteData.map((item, index) => {
        let displayReg =
          snapshot[item].type === "driver"
            ? snapshot[item].cars[0].reg
            : snapshot[item].treg;
        if (!displayReg) {
          return;
        }
        return (
          <NoteListItem
            key={snapshot[item].id}
            id={snapshot[item].id}
            toggle={noteToggle}
            setModalReg={setModalReg}
            status={snapshot[item].status}
            type={snapshot[item].type}
            displayReg={displayReg}
          />
        );
      })}
      <Modal shown={noteShown} toggle={noteToggle}>
        <ReleaseNote toggle={noteToggle} id={modalReg} />
      </Modal>
    </div>
  );
};

const Styles = {
  container: {
    width: "90%",
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  noteContainer: {
    width: "120px",
    height: "40px",
    backgroundColor: "#1ae",
    margin: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  },
  filterContainer: {
    width: "90%",
  },
  filterBar: {
    width: "250px",
    fontSize: "2em",
    maxWidth: "40%",
    backgroundColor: "#eee",
    color: "#000",
    marginTop: "20px",
    marginBottom: "20px",
  },
};

export default Notes;
