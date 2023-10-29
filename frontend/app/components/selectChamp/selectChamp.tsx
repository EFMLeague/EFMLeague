"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function selectChamp({
  championData,
  selectedChampion,
  setSelectedChampion: setSelectionChampion,
  team,
  role,
}: {
  championData: any;
  selectedChampion: {
    blue: {
      top: string;
      jng: string;
      mid: string;
      adc: string;
      sup: string;
    };
    red: {
      top: string;
      jng: string;
      mid: string;
      adc: string;
      sup: string;
    };
  };
  setSelectedChampion: React.Dispatch<
    React.SetStateAction<{
      blue: {
        top: string;
        jng: string;
        mid: string;
        adc: string;
        sup: string;
      };
      red: {
        top: string;
        jng: string;
        mid: string;
        adc: string;
        sup: string;
      };
    }>
  >;
  team: "red" | "blue";
  role: "top" | "jng" | "mid" | "adc" | "sup";
}) {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  // const [selection, setSelection] = useState<any>(null);

  const champions = Object.values(championData);

  const championsFiltered = champions.filter((champion: any) =>
    champion.id.toLowerCase().includes(filter.toLowerCase())
  );

  const version = (champions[0] as any).version;

  return (
    <div className="flex justify-center items-center mx-auto">
      <p>{team +" "+role+" "+selectedChampion[team][role]}</p>
      <div className="px-24 ">
        <input
          type="text"
          placeholder="Filtra per nome"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
        />
        <div
          className={
            "grid grid-cols-4 bg-white h-64 max-w-[380px] gap-4 pt-2 border-2 overflow-y-scroll overflow-x-clip absolute " +
            (open === true ? " " : "hidden")
          }
        >
          {championsFiltered.map((champion: any) => (
            <div
              key={champion.id}
              className="relative hover:scale-105 hover:cursor-pointer px-2"
              onClick={(e) => {
                setSelectionChampion((obj) => ({
                  ...obj,
                  [team]: { ...obj[team], [role]: champion.id },
                }));
              }}
            >
              <Image
                src={
                  "https://ddragon.leagueoflegends.com/cdn/" +
                  version +
                  "/img/champion/" +
                  champion.id +
                  ".png"
                }
                alt=""
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="text-dark">{champion.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Image
        src={
          "https://ddragon.leagueoflegends.com/cdn/" +
          version +
          "/img/champion/" +
          (selectedChampion[team][role]
            ? selectedChampion[team][role]
            : "?") +
          ".png"
        }
        alt=""
        width={48}
        height={48}
        className="h-16 w-16"
      />
    </div>
  );
}
