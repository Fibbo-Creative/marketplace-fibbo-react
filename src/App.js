import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useContractsContext } from "./context/contracts/ContractProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { contractActionTypes } from "./context/contracts/contractsReducer";
import useChain from "./hooks/useChain";
import useAccount from "./hooks/useAccount";
import ExploreContainer from "./pages/explore/ExploreContainer";
import HomeContainer from "./pages/home/HomeContainer";
import CreateContainer from "./pages/create/CreateContainer";
import ItemPage from "./pages/item/ItemPage";

function App() {
  const [, dispatch] = useContractsContext();
  const { loadingConnection, wallet, balance } = useAccount();
  const { correctChain } = useChain(loadingConnection);

  return (
    <div className={`App`}>
      <BrowserRouter>
        <>
          <Navbar wallet={wallet} balance={balance} />

          <Routes>
            <Route path="/create" element={<CreateContainer />} />
            <Route path="/create" element={<CreateContainer />} />
            <Route path="/explore" element={<ExploreContainer />} />
            <Route path="/explore/:tokenId" element={<ItemPage />} />

            <Route path="" element={<HomeContainer />} />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
