import { useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { Navigate, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, user } = FirebaseContext();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      useNavigate("/dashboard");
    } catch (error) {}
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div style={Styles.container}>
        <h1>Sign In</h1>

        <form id="signInForm">
          <div style={Styles.flexContainer}>
            <label>Email Address:</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div style={Styles.flexContainer}>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <button onClick={handleLogIn}>Log In</button>
        </form>
      </div>
    );
  }
};

const Styles = {
  container: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContents: "center",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    width: "200px",
    alignItems: "center",
    justifyContents: "center",
  },
};

export default SignIn;
