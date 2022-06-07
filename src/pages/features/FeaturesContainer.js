import React, { useEffect, useState } from "react";
import { FeatureItem } from "./components/FeatureItem";
import ActionButton from "../../components/ActionButton";
import NewFeatureModal from "./components/NewFeatureModal";
import { useCommunity } from "../../contracts/community";
import { useStateContext } from "../../context/StateProvider";

export default function FeaturesContainer() {
  const { getSuggestionsInProgress } = useCommunity();
  const [{ verifiedAddress }] = useStateContext();
  const [suggestionsInProgress, setSuggestionsInProgress] = useState([]);
  const [showNewSuggestion, setShowNewSuggestion] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      let _suggInProg = await getSuggestionsInProgress();
      setSuggestionsInProgress(_suggInProg);
    };
    fetchSuggestions();
  }, []);
  return (
    <div className="mt-[90px] " style={{ height: "94vh" }}>
      {verifiedAddress ? (
        <>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="uppercase font-bold text-4xl mt-10">
              Suggerencias
            </div>
            <div className=" w-2/3 text-center">
              Vota y contribuye a decidir la evolución del marketplace de FIBBO,
              la comunidad es la desencadenante de los próximos pasos a añadir
              para conseguir el producto de todos
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="uppercase font-bold text-xl mt-10">
              Suguiere algun cambio
            </div>
            <ActionButton
              buttonAction={() => setShowNewSuggestion(true)}
              text="Añadir Suggerencia"
              size="large"
            />
          </div>
          <div className="mt-10 flex flex-col justify-center items-center gap-2 mx-20">
            {suggestionsInProgress.map((item) => {
              return (
                <FeatureItem key={Math.random(999) * 100} suggestion={item} />
              );
            })}
          </div>{" "}
        </>
      ) : (
        <div>
          <div>No eres un artista verificado para poder sugerir cambios</div>
          <div>
            <ActionButton
              size="large"
              text={"Go to Homepage"}
              buttonAction={() => window.location.replace("/")}
            />
          </div>
        </div>
      )}
      <NewFeatureModal
        showModal={showNewSuggestion}
        handleCloseModal={() => setShowNewSuggestion(false)}
      />
    </div>
  );
}
