import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAccount from "./hooks/useAccount";
import ExploreContainer from "./pages/explore/ExploreContainer";
import HomeContainer from "./pages/home/HomeContainer";
import CreateContainer from "./pages/create/CreateContainer";
import ItemPage from "./pages/item/ItemPage";
import ReactModal from "react-modal";
import ProfileContainer from "./pages/profile/ProfileContainer";
import NotFoundContainer from "./pages/notFound/NotFoundContainer";
import FeaturesContainer from "./pages/features/FeaturesContainer";
import useChain from "./hooks/useChain";
import { VerificationFormContainer } from "./pages/verficiation/VerificationFormContainer";

ReactModal.defaultStyles.overlay.backgroundColor = "rgba(73, 77, 91, 0.5)";
ReactModal.defaultStyles.content.width = "fit-content";
ReactModal.defaultStyles.content.height = "max-content";
ReactModal.defaultStyles.content.margin = "auto";
ReactModal.defaultStyles.content.maxHeight = "";
ReactModal.defaultStyles.content.borderRadius = 50;
ReactModal.defaultStyles.overlay.height = "100%";
ReactModal.defaultStyles.overlay.width = "100vw";
ReactModal.defaultStyles.overlay.display = "flex";
ReactModal.defaultStyles.overlay.justifyContent = "center";
ReactModal.defaultStyles.overlay.alignItems = "center";

function App() {
  const { wallet, connectToWallet } = useAccount();
  const chain = useChain();

  return (
    <div className={`App`} id="App">
      <BrowserRouter>
        <>
          <Navbar wallet={wallet} connectToWallet={connectToWallet} />

          <Routes>
            <Route path="*" element={<NotFoundContainer />} />
            <Route path="/create" element={<CreateContainer />} />
            <Route path="/features" element={<FeaturesContainer />} />
            <Route
              path="/verificate/request"
              element={<VerificationFormContainer />}
            />

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
