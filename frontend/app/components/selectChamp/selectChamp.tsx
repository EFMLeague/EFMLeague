"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function selectChamp({ championData }: { championData: any }) {
  const [filter, setFilter] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };

  const champions = Object.values(championData);

  const championNames = champions.filter((champion: any) =>
    champion.name.toLowerCase().includes(filter.toLowerCase())
  );

  const championId = (championName: string) => {
    const champion = champions.find(
      (champ: any) => champ.name === championName
    );
    if (!champion) return null;
    return (champion as any).id;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const version = (champions[0] as any).version;

  return (
    <div className="flex justify-center items-center mx-auto">
      <div className="px-24 ">
        <input
          type="text"
          placeholder="Filtra per nome"
          value={filter}
          onChange={handleFilterChange}
          onClick={handleOpen}
        />
        <div
          className={
            "grid grid-cols-4 bg-white h-64 max-w-[380px] gap-4 pt-2 border-2 overflow-y-scroll overflow-x-clip absolute " +
            (open === true ? " " : "hidden")
          }
        >
          {championNames.map((champion: any) => (
            <div
              key={champion.id}
              className="relative hover:scale-105 hover:cursor-pointer px-2"
              onClick={() => {
                setFilter(champion.name);
                handleOpen();
              }}
            >
              <Image
                src={
                  "https://ddragon.leagueoflegends.com/cdn/" +
                  version +
                  "/img/champion/" +
                  championId(champion.name) +
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
          championId(filter) +
          ".png"
        }
        alt=""
        width={48}
        height={48}
        className="h-16 w-16"
      ></Image>
    </div>
  );
}
