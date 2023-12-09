import React from "react";
import Image from "next/image";
import champions from "../../../public/champions/champion-summary.json" assert { type: "json" };
import "../../globals.css";

export default function PickImage({
  champ,
}: {
  champ?: { name: string; active: boolean };
}) {
  const extractID = (champ: string) => {
    const res = champions.find(({ alias }) => alias === champ);
    return res;
  };

  const idChamp = () => {
    if (champ === undefined) {
      return undefined;
    } else {
      return extractID(champ.name)?.id;
    }
  };
  const idChampion = idChamp();

  return (
    <div
      className={
        "h-[130px] w-[320px] border-yellow-700 m-4 shadow-inner overflow-hidden" +
        (champ?.active ? "border-r-8 border-yellow-800" : "")
      }
    >
      <Image
        src={
          idChampion === undefined
            ? "https://draftlol.dawe.gg/rectangle.png"
            : "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/" +
              idChampion +
              "/" +
              idChampion +
              "000.jpg"
        }
        alt=""
        width={640}
        height={360}
        className="pickImg"
      />
    </div>
  );
}
