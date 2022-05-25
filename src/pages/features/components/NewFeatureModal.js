import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import tw from "tailwind-styled-components";
import ActionButton from "../../../components/ActionButton";
import marketplaceApi from "../../../context/axios";
import useAccount from "../../../hooks/useAccount";

export default function NewFeatureModal({
  children,
  showModal,
  handleCloseModal,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { wallet } = useAccount();
  const addNewSuggestion = async () => {
    //Añadir la sugerencia en el Backend
    console.log(title, desc, wallet);

    const newSuggestionRequest = await marketplaceApi.post("newSuggestion", {
      wallet: wallet,
      title: title,
      description: desc,
    });

    handleCloseModal();
  };
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
    >
      <div className="flex flex-col w-full h-full p-2 w-[700px]">
        <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={() => handleCloseModal()}
        >
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </div>
        <div className="flex items-center justify-center w-full border-b border-gray-300">
          <div className="text-center">Nueva Suggerencia</div>
        </div>

        <div className="my-10 mx-8 flex flex-col gap-10">
          <div>
            Tu suggerencia será revisada y se le asignará un valor por parte del
            equipo técnico, una vez sea acceptada y valorada se mostrará en la
            lista!
          </div>
          <div className="flex flex-col gap-2">
            <div className="uppercase">Título</div>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="uppercase">Descripción</div>
            <InputTextArea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="5"
            />
          </div>
          <div className="w-full flex justify-center">
            <ActionButton
              buttonAction={() => addNewSuggestion()}
              text="Añadir Suggerencia"
              size="large"
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

const Input = tw.input`
    text-black flex-1 outline-none p-2 bg-gray-300 font-bold rounded-md w-full
`;

const InputTextArea = tw.textarea`
    h-[200px] text-black flex-1 outline-none p-2 bg-gray-300 font-bold rounded-md w-full resize-y
`;
