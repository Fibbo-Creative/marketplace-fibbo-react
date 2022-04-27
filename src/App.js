import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useContractsContext } from "./context/contracts/ContractProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { contractActionTypes } from "./context/contracts/contractsReducer";
import useChain from "./hooks/useChain";
import useAccount from "./hooks/useAccount";
import ExploreContainer from "./pages/explore/ExploreContainer";
import HomeContainer from "./pages/home/HomeContainer";
import CreateContainer from "./pages/create/CreateContainer";
import ItemPage from "./pages/item/ItemPage";
import ReactModal from "react-modal";
import ProfileContainer from "./pages/profile/ProfileContainer";

ReactModal.defaultStyles.overlay.backgroundColor = "rgba(73, 77, 91, 0.5)";
ReactModal.defaultStyles.content.width = "max-content";
ReactModal.defaultStyles.content.height = "fit-content";
ReactModal.defaultStyles.content.margin = "auto";
ReactModal.defaultStyles.content.borderRadius = 50;

function App() {
  const [{ wallet }, dispatch] = useContractsContext();
  const { connectToWallet } = useAccount();

  return (
    <div className={`App`}>
      <BrowserRouter>
        <>
          <Navbar wallet={wallet} connectToWallet={connectToWallet} />

          <Routes>
            <Route path="/create" element={<CreateContainer />} />

            <Route path="/create" element={<CreateContainer />} />
            <Route path="/explore" element={<ExploreContainer />} />
            <Route
              path="/explore/:collection/:tokenId"
              element={<ItemPage />}
            />

            <Route path="/profile/:address" element={<ProfileContainer />} />

            <Route path="" element={<HomeContainer />} />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
