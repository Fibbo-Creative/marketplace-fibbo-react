import React, { useEffect, useState } from "react";
import { FeatureItem } from "./components/FeatureItem";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import { formatEther } from "ethers/lib/utils";
import ActionButton from "../../components/ActionButton";
import NewFeatureModal from "./components/NewFeatureModal";

const formatSuggestion = (suggestions) => {
  return suggestions.map((sugg) => {
    return {
      suggestionId: sugg.suggestionId.toNumber(),
      title: sugg.title,
      description: sugg.description,
      totalAmount: formatEther(sugg.totalAmount),
      progress: formatEther(sugg.progress),
    };
  });
};

export default function FeaturesContainer() {
  const [suggestionsInProgress, setSuggestionsInProgress] = useState([]);
  const [showNewSuggestion, setShowNewSuggestion] = useState(false);
  const [{ suggestionsContract }, dispatch] = useContractsContext();
  useEffect(() => {
    const fetchSuggestions = async () => {
      let _suggInProg = await suggestionsContract.getInProgressSuggestions();
      setSuggestionsInProgress(formatSuggestion(_suggInProg));
    };
    fetchSuggestions();
  }, [suggestionsContract]);
  return (
    <div className="mt-[90px] " style={{ height: "94vh" }}>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="uppercase font-bold text-4xl mt-10">Suggerencias</div>
        <div className=" w-2/3 text-center">
          Vota y contribuye a decidir la evolución del marketplace de FIBBO, la
          comunidad es la desencadenante de los próximos pasos a añadir para
          conseguir el producto de todos
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
          return <FeatureItem key={Math.random(999) * 100} suggestion={item} />;
        })}
      </div>
      <NewFeatureModal
        showModal={showNewSuggestion}
        handleCloseModal={() => setShowNewSuggestion(false)}
      />
    </div>
  );
}
