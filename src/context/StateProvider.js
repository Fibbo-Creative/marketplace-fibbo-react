import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getLiterals, initialState } from "./stateReducer";

const StateContext = createContext();

const StateProvider = ({ reducer, children }) => {
  const [lang, setLang] = useState(window.localStorage.getItem("lang"));

  return (
    <StateContext.Provider
      value={useReducer(reducer, {
        ...initialState,
        lang: lang,
        literals: getLiterals(lang),
      })}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export default StateProvider;
