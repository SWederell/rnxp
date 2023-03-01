import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Header,
  Admin,
  SignIn,
  Notes,
  ProtectedRoute,
  Account,
} from "./components";

function App() {
  return (
    <div className="App" style={Styles.container}>
      <Header />
      <div style={Styles.pageContainer}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

const Styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    margin: "0 auto",
    flexDirection: "column",
    overflow: "hidden",
  },
  pageContainer: {
    flex: "1 1 auto",
    overflowY: "auto",
  },
};

export default App;
