const Modal = ({ shown, toggle, children }) => {
  if (shown) {
    return (
      <div
        style={Styles.overlay}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={Styles.container}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    );
  } else {
    return;
  }
};

const Styles = {
  overlay: {
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    backgroundColor: "#000000b3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    width: "95%",
    maxWidth: "1200px",
    height: "auto",
    backgroundColor: "#1a1a1a",
    position: "relative",
    marginTop: "20px",
  },
};

export default Modal;
