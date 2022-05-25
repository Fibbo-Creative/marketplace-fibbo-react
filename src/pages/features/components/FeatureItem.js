import React, { useState } from "react";
import tw from "tailwind-styled-components";
import ActionButton from "../../../components/ActionButton";

export const FeatureItem = ({ suggestion }) => {
  const [depositValue, setDepositValue] = useState(0.01);
  const { suggestionId, title, description, totalAmount, progress } =
    suggestion;
  return (
    <Container>
      <TitleContainer>{title}</TitleContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
      <ProgressContainer>
        <div>Progress</div>
        <div>
          {progress} / {totalAmount} MATIC
        </div>
      </ProgressContainer>
      <DepositContainer>
        <Input
          onChange={(e) => setDepositValue(e.target.value)}
          value={depositValue}
          type="number"
          step=".01"
        />
        <ActionButton text={"Deposit"} size={"small"} />
      </DepositContainer>
    </Container>
  );
};

const Container = tw.div`
    flex flex-col w-full border border-gray-300 p-2
`;

const TitleContainer = tw.div`
    flex text-xl font-bold
`;

const DescriptionContainer = tw.div`

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
