import React, { useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import FiboIMG from "../../assets/logoNavbarSmall.png";
import { useApi } from "../../api";
import { VerifiedCard } from "../../components/VerifiedCard";
import { InfoCard } from "../../components/InfoCard";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export const VerificationContainer = () => {
  const navigate = useNavigate();
  const { getVerificatedArtists } = useApi();
  const [verifiedArtists, setVerifiedArtists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const verified = await getVerificatedArtists();
      setVerifiedArtists(verified);
    };
    fetchData();
  }, []);
  return (
    <div
      className="w-screen mt-[90px] flex flex-col items-center"
      style={{ height: "94vh" }}
    >
      <div className="flex flex-col-reverse  lg:flex-row-reverse items-center justify-center w-full gap-10 py-5 px-10">
        <div className="flex flex-col gap-10 items-center md:items-start">
          <div className="flex flex-col gap-2">
            <div className="text-5xl font-bold">Veríficate cómo Artista</div>
            <div className="">
              Aporta tu talento y únete a la comunidad de FIBBO. Sé partícipe de
              la evolución de la plataforma artística.
            </div>
          </div>
          <div>
            <ActionButton
              text="Verificate"
              size="large"
              buttonAction={() => navigate("/verificate/request")}
            />
          </div>
        </div>
        <div className="flex flex-col w-full justify-center gap-5 max-w-[600px] ">
          {/* <div className="text-xl font-bold">Artistas Verificados</div>
          <div className="flex flex-wrap h-full border w-full p-5">
            {verifiedArtists.map((item) => {
              return (
                <VerifiedCard
                  key={item.username}
                  avatar={item.profileImg}
                  username={item.username}
                />
              );
            })}
          </div> */}
          <div className="flex items-center w-full justify-center  ">
            <img
              src={FiboIMG}
              alt="FibboLogo"
              className="w-[600px]  h-[375px] md:h-[700px] object-contain flex p-10 xl:p-0"
            ></img>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-10 py-10 px-10">
        <div className="flex flex-col items-center gap-10">
          <div className="text-2xl font-bold">
            Porqué verificarme cómo Artista?
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            <InfoCard
              icon="ic:round-build-circle"
              title="Crear NFTs"
              content="Podrás mintear y poner a la venta tus obras artísticas, beneficiandote de los royalties"
            />
            <InfoCard
              icon="fluent:people-community-add-28-filled"
              title="Sugerir cambios"
              content="Serás capaz de ayudar a escalar el marketplace, siendo recompensado"
            />
            <InfoCard
              icon="icon-park-solid:emotion-happy"
              title="Fees reducidas"
              content="Si eres un artista verificado, asumiremos gran parte de las comisiones"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
