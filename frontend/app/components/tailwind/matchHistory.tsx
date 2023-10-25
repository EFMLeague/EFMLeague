"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from "next/image";

const Icon = (id: any, open: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? " rotate-180 " : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export default function matchHistory({ game }: { game: any }) {
  // console.log(game.data);
  // console.log(allGames);

  const extractPlayer = (
    role: "top" | "mid" | "jng" | "adc" | "sup",
    team: "blue" | "red"
  ) => {
    const p = game.data.find(
      (el: { Ruolo: string; Squadra: string }) =>
        el.Ruolo === role && el.Squadra === team
    );
    return <span>{p.NomeUtente}</span>;
  };

  const extractChamp = (
    role: "top" | "mid" | "jng" | "adc" | "sup",
    team: "blue" | "red"
  ) => {
    const p = game.data.find(
      (el: { Ruolo: string; Squadra: string }) =>
        el.Ruolo === role && el.Squadra === team
    );
    if (p.ChampGiocato === null) p.ChampGiocato = "Aatrox";
    return p.ChampGiocato;
  };

  const extractMVP = game.data.map((el: { MVP: any; NomeUtente: any }) => {
    if (el.MVP) return el.NomeUtente;
  });

  const [open, setOpen] = useState(0);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getDate = (date: string) => {
    const numberMonth = Number(date.split("-")[1]);
    const nameMonth = month[numberMonth];
    const newDay = date.split("-")[2];
    const newYear = date.split("-")[0];
    return newDay + " " + nameMonth + " " + newYear;
  };
  const exractWinnerTeam = () => {
    if (game.data[0].Vittoria) {
      return game.data[0].Squadra;
    } else {
      if (game.data[0].Squadra === "red") {
        return "red";
      } else {
        return "blue";
      }
    }
  };

  const handleOpen = (value: React.SetStateAction<number>) =>
    setOpen(open === value ? 0 : value);

  return (
    <div className="pt-2">
      <Accordion
        open={open === game.IDPartita}
        icon={<Icon id={game.IDPartita} open={open} />}
      >
        <div className=" flex">
          <p className="border bg-[#0f0f0f] text-white text-[1rem] hover:text-gray-300 p-1">
            {getDate(game.data[0].DataPartita.split("T")[0])}
          </p>
        </div>

        <AccordionHeader
          onClick={() => handleOpen(game.IDPartita)}
          className="border bg-[#0f0f0f] text-white grid grid-cols-8 hover:text-gray-300"
        >
          <div className="pl-2 col-span-2 ">
            {game.data[0].DataPartita.split("T")[1].substr(0, 5)}
          </div>

          <div className="col-span-4 ">
            {exractWinnerTeam() === "blue" ? (
              <div className="flex justify-center items-center">
                <Image
                  src="/img/icons/crown64.png"
                  className="h-12 w-12"
                  height={48}
                  width={48}
                  alt=""
                />
                <p className="text-blue-500">BLUE</p>
                <p className="text-white px-4">VS</p>
                <p className="text-red-500">RED</p>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-blue-500">BLUE</p>
                <p className="text-white px-4">VS</p>
                <p className="text-red-500">RED</p>
                <Image
                  src="/img/icons/crown64.png"
                  className="h-12 w-12"
                  height={48}
                  width={48}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="col-span-1">{""}</div>
        </AccordionHeader>
        <AccordionBody>
          <div className="grid grid-cols-2 relative">
            <div className="bg-white border order-1 lg:order-1 border-black col-span-2 lg:col-span-1">
              <p className="bg-blue-400 text-white text-center text-[3rem] font-bold">
                TEAM BLUE
              </p>
              <div className="p-6">
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src="/img/roles/top.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("top", "blue")}
                  </p>
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("top", "blue") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src="/img/roles/jng.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("jng", "blue")}
                  </p>
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("jng", "blue") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src="/img/roles/mid.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("mid", "blue")}
                  </p>
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("mid", "blue") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src="/img/roles/adc.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("adc", "blue")}
                  </p>
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("adc", "blue") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src="/img/roles/sup.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("sup", "blue")}
                  </p>
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("sup", "blue") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white border order-3 lg:order-2 border-black col-span-2 lg:col-span-1">
              <p className="bg-red-400 text-white text-center text-[3rem] font-bold">
                TEAM RED
              </p>
              <div className="p-6">
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("top", "red") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("top", "red")}
                  </p>
                  <Image
                    src="/img/roles/top.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("jng", "red") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("jng", "red")}
                  </p>
                  <Image
                    src="/img/roles/jng.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("mid", "red") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("mid", "red")}
                  </p>
                  <Image
                    src="/img/roles/mid.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("adc", "red") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("adc", "red")}
                  </p>
                  <Image
                    src="/img/roles/adc.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                </div>
                <div className="grid grid-cols-3 place-items-center py-3">
                  <Image
                    src={
                      "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                      extractChamp("sup", "red") +
                      ".png"
                    }
                    alt=""
                    width={52}
                    height={52}
                    className="h-14 w-14  rounded-full"
                  />
                  <p className="lg:text-[1.5rem] font-semibold text-black">
                    {extractPlayer("sup", "red")}
                  </p>
                  <Image
                    src="/img/roles/sup.png"
                    height={64}
                    width={64}
                    className="h-16"
                    alt=""
                  />{" "}
                </div>
              </div>
            </div>
            <div className="bg-white border order-2 lg:order-3 border-black col-span-2 lg:col-span-1">
              <p className="bg-blue-400 text-white text-center text-[2rem] font-bold">
                BAN
              </p>
              <div className="grid grid-cols-5 place-items-center p-2">
                <Image
                  src={
                    "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                    extractChamp("top", "red") +
                    ".png"
                  }
                  alt=""
                  width={52}
                  height={52}
                  className="h-14 w-14  rounded-full"
                />
              </div>
            </div>
            <div className="bg-white border order-4 lg:order-4 border-black col-span-2 lg:col-span-1">
              <p className="bg-red-400 text-white text-center text-[2rem] font-bold">
                BAN
              </p>
              <div className="grid grid-cols-5 place-items-center p-2">
                <Image
                  src={
                    "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
                    extractChamp("top", "red") +
                    ".png"
                  }
                  alt=""
                  width={52}
                  height={52}
                  className="h-14 w-14  rounded-full"
                />
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
}
