import { ThemeContext } from "../contexts/ThemeContext";

const NoteListItem = ({
  id,
  toggle,
  displayReg,
  setModalReg,
  status,
  type,
}) => {
  const { buttonColours } = ThemeContext();

  const handleClick = () => {
    toggle();
    setModalReg(id);
  };

  const getBGColor = () => {
    if (status === "aborted") {
      return buttonColours.invalid;
    }

    if (status === "complete") {
      return buttonColours.complete;
    }

    if (type === "transporter") {
      return buttonColours.transporter;
    }

    return buttonColours.default;
  };

  return (
    <button
      style={{ ...Styles.noteContainer, backgroundColor: getBGColor() }}
      onClick={handleClick}
    >
      {displayReg}
    </button>
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

export default NoteListItem;
