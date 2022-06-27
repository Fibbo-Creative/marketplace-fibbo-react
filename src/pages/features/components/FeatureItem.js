import { parseEther } from "ethers/lib/utils";
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import ActionButton from "../../../components/ActionButton";
import { useCommunity } from "../../../contracts/community";

export const FeatureItem = ({ suggestion, suggestionsContract }) => {
  const { addTokensToSuggestion } = useCommunity();
  const [depositValue, setDepositValue] = useState("");

  const { suggestionId, title, description, totalAmount, progress, proposer } =
    suggestion;

  const depositToSuggestion = async () => {
    await addTokensToSuggestion(
      suggestionId,
      parseEther(depositValue.toString())
    );

    window.location.reload();
  };
  return (
    <Container>
      <TitleContainer>{title}</TitleContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
      <div className="flex gap-5 mt-3 items-center">
        <div>Propuesto por</div>
        <div className="flex gap-2 items-center border p-2 rounded-xl">
          <img
            className="rounded-full"
            width={32}
            src={proposer.profileImg}
            alt={`from-${proposer._id}-img`}
          />
          <p
            className="text-primary-2 underline cursor-pointer"
            onClick={() => window.open(`/profile/${proposer.wallet}`, "_blank")}
          >
            {proposer.username}
          </p>
        </div>
      </div>
      <ProgressContainer>
        <div>Progreso</div>
        <div>
          {progress} / {totalAmount} FTM
        </div>
      </ProgressContainer>
      <DepositContainer>
        <Input
          onChange={(e) => setDepositValue(e.target.value)}
          value={depositValue}
          type="number"
          placeholder="Introduce la cantidad a donar..."
          step=".01"
        />
        <ActionButton
          buttonAction={depositToSuggestion}
          text={"Contribuye"}
          size={"small"}
        />
      </DepositContainer>
    </Container>
  );
};

const Container = tw.div`
    flex flex-col w-full border rounded-md border-gray-300 p-2 dark:bg-dark-2
`;

const TitleContainer = tw.div`
    flex text-xl font-bold
`;

const DescriptionContainer = tw.div`
  text-sm md:text-lg
`;

const ProgressContainer = tw.div`
    flex justify-between my-5
`;

const DepositContainer = tw.div`
    flex justify-between gap-3 items-center

`;

const Input = tw.input`
    text-black flex-1 outline-none p-2 bg-gray-300 font-bold rounded-md
`;

const FilledButton = tw.button`
 flex items-center justify-center uppercase cursor-pointer bg-[#BFC500] hover:bg-gray-300 text-black font-bold py-2 px-4 rounded
`;

const OutlinedButton = tw(FilledButton)`
 bg-black text-[#BFC500] border-[#BFC500] border-2 hover:bg-[#BFC500] hover:text-black
`;
