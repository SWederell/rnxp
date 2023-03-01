import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../contexts/FirebaseContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout, user, getALevel } = FirebaseContext();
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div style={Styles.container}>
      <div style={Styles.inner}>
        <div style={Styles.left}>
          <button
            onClick={() => {
              handleClick("/");
            }}
          >
            Dashboard
          </button>
          {/* <button
            onClick={() => {
              handleClick("/account");
            }}
          >
            Account
          </button> */}
          {getALevel() >= 9 && (
            <button
              onClick={() => {
                handleClick("/admin");
              }}
            >
              Admin
            </button>
          )}
        </div>
        <div style={Styles.right}>
          {user && (
            <button
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Styles = {
  container: {
    width: "100vw",
    height: "50px",
    minHeight: "50px",
    backgroundColor: "#aaa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    flexWrap: "wrap",
  },
  inner: {
    width: "90%",
    height: "100%",
    maxWidth: "1000px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex start",
  },
  left: {
    display: "flex",
    flexGrow: 1,
  },
  right: {},
};

export default Header;
