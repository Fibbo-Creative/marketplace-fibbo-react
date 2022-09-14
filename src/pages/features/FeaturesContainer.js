import React, { useEffect, useRef, useState } from "react";
import { FeatureItem } from "./components/FeatureItem";
import ActionButton from "../../components/ActionButton";
import NewFeatureModal from "./components/NewFeatureModal";
import { useCommunity } from "../../contracts/community";
import { useStateContext } from "../../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import { NotVerified } from "../../components/basic/NotVerified";
import useAccount from "../../hooks/useAccount";

export default function FeaturesContainer() {
  const { wallet, connectToWallet } = useAccount();
  const [{ verifiedAddress, literals }] = useStateContext();
  const { getProfileInfo, getActiveSuggestions, voteIntoSuggestion } = useApi();

  const [loading, setLoading] = useState(true);
  const [suggestionsInProgress, setSuggestionsInProgress] = useState([]);
  const [showNewSuggestion, setShowNewSuggestion] = useState(false);

  const voteSuggestion = async (suggestion) => {
    await voteIntoSuggestion(
      wallet,
      suggestion.title,
      suggestion.proposer.wallet
    );

    let list = suggestionsInProgress.filter(
      (item) =>
        item.title !== suggestion.title &&
        item.proposer.wallet !== suggestion.proposer.wallet
    );

    const updated = {
      ...suggestion,
      votes: suggestion.votes + 1,
      voters: [...suggestion.voters, wallet],
    };
    let newList = [...list, updated];
    console.log(sortSuggestions(newList));
    setSuggestionsInProgress(sortSuggestions(newList));
  };

  const sortByVotes = (suggestionA, suggestionB) => {
    if (suggestionA.votes > suggestionB.votes) {
      return -1;
    } else {
      return 1;
    }
  };

  const sortSuggestions = (suggestions) => {
    const sorted = suggestions.sort(sortByVotes);
    return sorted;
  };
  useEffect(() => {
    const fetchSuggestions = async () => {
      await connectToWallet();
      let _suggInProg = await getActiveSuggestions();
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
      console.log(formattedSugestions);
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
                {literals.features.suggestions}
              </div>
              <div className=" w-5/6 text-sm md:text-lg md:w-2/3 text-center">
                {literals.features.sentence}
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <div className="uppercase font-bold text-xl mt-10">
                {literals.features.suggest}
              </div>
              <ActionButton
                buttonAction={() => setShowNewSuggestion(true)}
                text={literals.actions.addSuggestion}
                size="large"
              />
            </div>
            <div className="mt-10 flex flex-col justify-center items-center gap-2 mx-2 md:mx-20">
              {suggestionsInProgress.map((item) => {
                return (
                  <FeatureItem
                    hasVoted={item.voters.includes(wallet)}
                    onVote={() => voteSuggestion(item)}
                    key={Math.random(999) * 100}
                    suggestion={item}
                  />
                );
              })}
            </div>{" "}
          </>
        ) : (
          <NotVerified text={literals.modals.artistNotVerified} />
        )}
        <NewFeatureModal
          showModal={showNewSuggestion}
          handleCloseModal={() => setShowNewSuggestion(false)}
        />
      </>
    </PageWithLoading>
  );
}
