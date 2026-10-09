"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from "next/image";

const Icon = ({ id, open }: { id: number; open: number }) => {
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

type Role = "top" | "jng" | "mid" | "adc" | "sup";
type Team = "blue" | "red";
const ROLES: Role[] = ["top", "jng", "mid", "adc", "sup"];

const ChampImage = ({ champ }: { champ: string | null }) =>
  champ ? (
    <Image
      src={
        "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/" +
        champ +
        ".png"
      }
      alt=""
      width={52}
      height={52}
      className="h-14 w-14  rounded-full"
    />
  ) : (
    // Campione non registrato per questa partita
    <div className="h-14 w-14 rounded-full bg-neutral-200" />
  );

const RoleImage = ({ role }: { role: Role }) => (
  <Image
    src={`/img/roles/${role}.png`}
    height={64}
    width={64}
    className="h-16"
    alt=""
  />
);

export default function matchHistory({
  game,
  hasWon,
}: {
  game: any;
  hasWon?: boolean;
}) {
  const players = game.data as any[];
  const id: number = players[0].IDPartita;

  const findPlayer = (role: Role, team: Team) =>
    players.find((el) => el.Ruolo === role && el.Squadra === team);

  const extractPlayer = (role: Role, team: Team) => {
    const p = findPlayer(role, team);
    if (!p) return <span>utente non trovato</span>;
    return <span>{p.username}</span>;
  };

  const extractChamp = (role: Role, team: Team): string | null =>
    findPlayer(role, team)?.ChampGiocato ?? null;

  const [open, setOpen] = useState(0);

  const month = [
    "",
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
    if (players[0].Vittoria === true) {
      return players[0].Squadra;
    } else {
      if (players[0].Squadra === "red") {
        return "blue";
      } else {
        return "red";
      }
    }
  };

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="pt-2">
      <Accordion open={open === id} icon={<Icon id={id} open={open} />}>
        <div className=" flex">
          <p className="border bg-[#0f0f0f] text-white text-[1rem] hover:text-gray-300 p-1">
            {getDate(players[0].DataPartita.split("T")[0])}
          </p>
        </div>

        <AccordionHeader
          onClick={() => handleOpen(id)}
          className={
            "bg-[#0f0f0f] text-white grid grid-cols-8 hover:text-gray-300 " +
            (hasWon === undefined
              ? "border"
              : hasWon
              ? "border-l-8 border-green-600"
              : "border-l-8 border-red-600")
          }
        >
          <div className="pl-2 col-span-2 ">
            {players[0].DataPartita.split("T")[1].substr(0, 5)}
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
                {ROLES.map((role) => (
                  <div
                    key={role}
                    className="grid grid-cols-3 place-items-center py-3"
                  >
                    <RoleImage role={role} />
                    <p className="lg:text-[1.5rem] font-semibold text-black">
                      {extractPlayer(role, "blue")}
                    </p>
                    <ChampImage champ={extractChamp(role, "blue")} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border order-3 lg:order-2 border-black col-span-2 lg:col-span-1">
              <p className="bg-red-400 text-white text-center text-[3rem] font-bold">
                TEAM RED
              </p>
              <div className="p-6">
                {ROLES.map((role) => (
                  <div
                    key={role}
                    className="grid grid-cols-3 place-items-center py-3"
                  >
                    <ChampImage champ={extractChamp(role, "red")} />
                    <p className="lg:text-[1.5rem] font-semibold text-black">
                      {extractPlayer(role, "red")}
                    </p>
                    <RoleImage role={role} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
}
