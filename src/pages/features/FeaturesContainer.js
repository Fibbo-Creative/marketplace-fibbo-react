import React, { useEffect, useState } from "react";
import { FeatureItem } from "./components/FeatureItem";
import ActionButton from "../../components/ActionButton";
import NewFeatureModal from "./components/NewFeatureModal";
import { useCommunity } from "../../contracts/community";
import { useStateContext } from "../../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import { NotVerified } from "../../components/basic/NotVerified";

export default function FeaturesContainer() {
  const navigate = useNavigate();
  const { getSuggestionsInProgress } = useCommunity();
  const [{ verifiedAddress }] = useStateContext();
  const { getProfileInfo } = useApi();

  const [loading, setLoading] = useState(true);
  const [suggestionsInProgress, setSuggestionsInProgress] = useState([]);
  const [showNewSuggestion, setShowNewSuggestion] = useState(false);

  const sortByProgress = (suggestionA, suggestionB) => {
    let progressA = parseFloat(suggestionA.progress);
    let totalAmountA = parseFloat(suggestionA.totalAmount);

    let progressB = parseFloat(suggestionB.progress);
    let totalAmountB = parseFloat(suggestionB.totalAmount);

    let progressPercentatgeA = (progressA / totalAmountA) * 100;
    let progressPercentatgeB = (progressB / totalAmountB) * 100;

    if (progressPercentatgeA > progressPercentatgeB) {
      return -1;
    } else {
      return 1;
    }
  };

  const sortSuggestions = (suggestions) => {
    const sorted = suggestions.sort(sortByProgress);
    return sorted;
  };
  useEffect(() => {
    const fetchSuggestions = async () => {
      let _suggInProg = await getSuggestionsInProgress();
      let formattedSugestions = await Promise.all(
        _suggInProg.map(async (item) => {
          const proposer = item.proposer;
          const profileInfo = await getProfileInfo(proposer);
          return {
            ...item,
            proposer: profileInfo,
          };
        })
      );
      setSuggestionsInProgress(sortSuggestions(formattedSugestions));
      setLoading(false);
    };
    fetchSuggestions();
  }, []);
  return (
    <PageWithLoading loading={loading}>
      <>
        {verifiedAddress ? (
          <>
            <div className="w-full dark:bg-gray-1 flex flex-col justify-center items-center gap-4">
              <div className="uppercase font-bold text-4xl mt-10">
                Sugerencias
              </div>
              <div className=" w-5/6 text-sm md:text-lg md:w-2/3 text-center">
                Vota y contribuye a decidir la evolución del marketplace de
                FIBBO, la comunidad es la desencadenante de los próximos pasos a
                añadir para conseguir el producto de todos
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <div className="uppercase font-bold text-xl mt-10">
                Sugiere algun cambio
              </div>
              <ActionButton
                buttonAction={() => setShowNewSuggestion(true)}
                text="Añadir Sugerencia"
                size="large"
              />
            </div>
            <div className="mt-10 flex flex-col justify-center items-center gap-2 mx-2 md:mx-20">
              {suggestionsInProgress.map((item) => {
                return (
                  <FeatureItem key={Math.random(999) * 100} suggestion={item} />
                );
              })}
            </div>{" "}
          </>
        ) : (
          <NotVerified
            text=" No eres un artista verificado para poder sugerir cambios,
          verificate y se parte de la comunidad!"
          />
        )}
        <NewFeatureModal
          showModal={showNewSuggestion}
          handleCloseModal={() => setShowNewSuggestion(false)}
        />
      </>
    </PageWithLoading>
  );
}
