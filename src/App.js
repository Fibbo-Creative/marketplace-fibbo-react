import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAccount from "./hooks/useAccount";
import ExploreContainer from "./pages/explore/ExploreContainer";
import HomeContainer from "./pages/home/HomeContainer";
import CreateContainer from "./pages/create/CreateContainer";
import ItemPage from "./pages/item/ItemPage";

import ProfileContainer from "./pages/profile/ProfileContainer";
import NotFoundContainer from "./pages/notFound/NotFoundContainer";
import FeaturesContainer from "./pages/features/FeaturesContainer";
import useChain from "./hooks/useChain";
import { VerificationFormContainer } from "./pages/verficiation/VerificationFormContainer";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import EditContainer from "./pages/edit/EditContainer";
import CreateCollectionContainer from "./pages/collection/create/CreateCollectionContainer";
import CollectionsContainer from "./pages/collection/CollectionsContainer";
import { CollectionDetailContainer } from "./pages/collection/detail/CollectionDetailContainer";
import MyCollectionsContainer from "./pages/collection/MyCollectionsContainer"

function App() {
  const { theme } = useContext(ThemeContext);
  const { wallet, connectToWallet } = useAccount();
  const chain = useChain();

  return (
    <div
      className={`App h-fit dark:bg-dark-1 dark:text-white`}
      data-theme={theme}
    >
      <BrowserRouter>
        <>
          <Navbar wallet={wallet} connectToWallet={connectToWallet} />

          <Routes>
            <Route path="*" element={<NotFoundContainer />} />
            <Route path="/create" element={<CreateContainer />} />
            <Route
              path="edit/:collection/:tokenId"
              element={<EditContainer />}
            />

            <Route path="/community" element={<FeaturesContainer />} />
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

            <Route path="/collections" element={<CollectionsContainer />} />
            <Route path="/myCollections" element={<MyCollectionsContainer />} />
            <Route
              path="/collection/create"
              element={<CreateCollectionContainer />}
            />
            <Route
              path="/collection/:collection"
              element={<CollectionDetailContainer />}
            />
            <Route path="" element={<HomeContainer />} />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
