import { createContext, useContext, useState } from "react";
const ThemeCxt = createContext();

export const ThemeContextProvider = ({ children }) => {
  const { darkMode, setDarkMode } = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const buttonColours = {
    default: "#11aaee",
    invalid: "#ff0000",
    transporter: "#6e00d4",
    complete: "#00a81c",
  };

  const dmTheme = {};
  const lmTheme = {};

  return (
    <ThemeCxt.Provider
      value={{
        darkMode,
        toggleDarkMode,
        setDarkMode,
        buttonColours,
      }}
    >
      {children}
    </ThemeCxt.Provider>
  );
};

export const ThemeContext = () => {
  return useContext(ThemeCxt);
};
