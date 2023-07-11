import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

// Initial state for the DarkModeContext
const INITIAL_STATE = {
  darkMode: false,
};

// Create the DarkModeContext
export const DarkModeContext = createContext(INITIAL_STATE);

// DarkModeContextProvider component
export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  // Render the DarkModeContextProvider with the context values
  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};