import React from "react";

import "../../globals.css";

export default function BanImage({
  champ,
}: {
  champ: { id: number | undefined; active: boolean };
}) {
  return (
    <div
      className={
        "h-[100px] w-[100px] border-yellow-700 m-4 shadow-inner overflow-hidden " +
        (champ?.active ? "border-t-8 border-yellow-800" : "")
      }
    >
      <img
        src={
          champ.id === undefined
            ? "https://draftlol.dawe.gg/rectangle.png"
            : "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/" +
              champ.id +
              ".png"
        }
        alt=""
        width={100}
        height={100}
        className="banImg"
      />
    </div>
  );
}
