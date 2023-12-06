"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function selectChamp({
  championData,
  selectedChampion,
  setSelectedChampion: setSelectionChampion,
  team,
  order,
}: {
  championData: any;
  selectedChampion: {
    blue: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    };
    red: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    };
  };
  setSelectedChampion: React.Dispatch<
    React.SetStateAction<{
      blue: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
      };
      red: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
      };
    }>
  >;

  team: "red" | "blue";
  order: 1 | 2 | 3 | 4 | 5;
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
    <div className="flex flex-col justify-center mx-auto">
      <div className=" flex items-center ">
        <Image
          src={
            "https://ddragon.leagueoflegends.com/cdn/" +
            version +
            "/img/champion/" +
            (selectedChampion[team][order]
              ? selectedChampion[team][order]
              : "?") +
            ".png"
          }
          alt=""
          width={48}
          height={48}
          className="h-16 w-16 mx-14 mt-3"
        />
        <input
          type="text"
          placeholder="Filtra per nome"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
          className="h-9 border border-black"
        />
      </div>
      <div
        className={
          "grid grid-cols-4 bg-white h-64 max-w-[380px] gap-4 pt-5 border-2  overflow-y-scroll overflow-x-clip absolute left-1/2 -translate-x-1/2 " +
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
                [team]: { ...obj[team], [order]: champion.id },
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
  );
}
