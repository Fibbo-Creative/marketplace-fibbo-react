import React, { createContext, useContext, useReducer } from "react";
import { constractsInitialState } from "./contractsReducer";

const ContractContext = createContext();

const ContractProvider = ({ reducer, children }) => {
  return (
    <ContractContext.Provider
      value={useReducer(reducer, constractsInitialState)}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractsContext = () => useContext(ContractContext);
export default ContractProvider;
