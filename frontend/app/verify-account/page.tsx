"use client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getUserByPuuid } from "../utils/riot/getUserByPuuid";
import ProgBar from "../components/tailwind/progBar";

export default function VerifyAccount() {
  const [verifica, setVerifica] = useState<number>(-1);
  const [otp, setOtp] = useState<number>(0);
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    (async function fetchSession() {
      const session = await getSession();
      setSession(session);
    })();
  }, []);
  console.log(session);

  const iniziaVerifica = () => {
    setVerifica(verifica + 1);
    setOtp(Math.round(Math.random() * 25 + 1));
  };

  const checkOtp = () => {
    // const summoner = await getUserByPuuid(session?.user?.name);
    // if (summoner.profileicon === otp) {
    setVerifica(verifica + 1);
    if (verifica === 3) {
      // const res = await supabase
    } else {
      setOtp(Math.round(Math.random() * 25 + 1));
    }
    // }
  };
  return (
    <div className="bg-white h-screen container mx-auto">
      <p className="text-center text-[3rem] uppercase">Verifica account</p>
      <p className="font-bold">UTENTE: {session?.user?.name}</p>
      {verifica === -1 ? (
        <button className="border p-4 bg-green-300" onClick={iniziaVerifica}>
          Verifica utente
        </button>
      ) : verifica < 3 ? (
        <div>
          <p>
            Per verificare il tuo account, Inserisci questa immagine sul tuo
            account LOL e clicca conferma
          </p>
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/" +
              otp +
              ".png"
            }
            alt=""
          />
          <button onClick={checkOtp}>Conferma</button>
          <ProgBar
            value={(verifica * 100) / 3}
            colors={"green"}
            barProps={""}
          />
        </div>
      ) : (
        <div>
          <p className="text-center text-4xl">verifica completata</p>
          <ProgBar
            value={(verifica * 100) / 3}
            colors={"green"}
            barProps={""}
          />
        </div>
      )}
    </div>
  );
}
