import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useApi } from "../../api";
import ActionButton from "../../components/ActionButton";
import { VerifiedCard } from "../../components/VerifiedCard";
import { useStateContext } from "../../context/StateProvider";
import useAccount from "../../hooks/useAccount";
import emailjs from "@emailjs/browser";

emailjs.init("A9IZio99Pk7PWQVes");

export const VerificationFormContainer = () => {
  const { newVerifyRequest } = useApi();
  const { wallet } = useAccount();
  const [{ userProfile }] = useStateContext();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [sendedCode, setSendedCode] = useState(null);
  const [verificationCode, setVerificationCode] = useState(0);
  const [verificatedEmail, setVerificatedEmail] = useState(false);

  const [completedAction, setCompletedAction] = useState(false);
  const sendNewVerifyRequest = async () => {
    if (name !== "" && lastName !== "" && description !== "") {
      await newVerifyRequest(wallet, name, lastName, description);
      setCompletedAction(true);
    }
  };

  const sendVerificationCode = () => {
    const _code = parseInt(Math.random(999999) * 10000000);
    setSendedCode(_code);
    console.log(_code);
    emailjs.send("service_20e5sep", "template_vmnwyr6", {
      to: email,
      verificationCode: _code,
    });
  };

  const checkVerifyCode = (code) => {
    setVerificationCode(code);
    console.log(sendedCode, parseInt(code));

    if (sendedCode === parseInt(code)) {
      setVerificatedEmail(true);
    } else {
      setVerificationCode(false);
    }
  };
  return (
    <div className="w-screen mt-[90px] flex flex-col justify-center items-center">
      {wallet && (
        <div className="border-2 shadow-lg w-1/2 p-5 flex flex-col items-center gap-10">
          <div className="uppercase text-xl">Solicita tu verificacion</div>

          <VerifiedCard
            avatar={userProfile.profileImg}
            username={userProfile.username}
            wallet={userProfile.wallet}
          />
          <div className="flex flex items-center gap-5 w-full">
            <div className="">Nombre</div>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex items-center gap-5 w-full">
            <div className="">Apellido</div>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="">¿ Porqué quieres utilizar Fibbo ?</div>
            <InputTextArea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex items-center gap-5 w-full">
            <div className="">Correo </div>
            <Input
              placeholder="example@gmail.com"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-sm">
            Te enviaremos un correo con un código de verificación para confirmar
            que tu correo existe. <br></br>Pulsa "Enviar Correo" para recibir
            este código e insertalo a continuacion
          </div>
          <div className="flex flex items-center gap-5 w-full">
            <div className="">Verificación</div>
            <div className="flex items-center justify-between w-full gap-3">
              <Input
                type="number"
                value={verificationCode}
                onChange={(e) => checkVerifyCode(e.target.value)}
              ></Input>
              <ActionButton
                size="small"
                text="Enviar Correo"
                buttonAction={sendVerificationCode}
              />
            </div>
          </div>
          <div>
            Te enviaremos un correo con noticias acerca de la verificación
          </div>
          <ActionButton
            disabled={completedAction || !verificatedEmail}
            size="large"
            text="Enviar solicitud"
            buttonAction={sendNewVerifyRequest}
          />
          {completedAction && (
            <div className="text-green-500">
              Tu solicitud ha sido enviada, la revisaremos y valoraremos tu
              verificacion.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Input = tw.input`
    text-black flex-1 outline-none py-2 px-2 bg-gray-300 font-bold rounded-md w-full
`;

const InputTextArea = tw.textarea`
    h-[200px] text-black flex-1 outline-none p-2 bg-gray-300 font-bold rounded-md w-full resize-y
`;
