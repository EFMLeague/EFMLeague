import React from "react";

import "../../globals.css";

export default function PickImage({
  champ,
}: {
  champ: { id: number | undefined; active: boolean };
}) {
  return (
    <div
      className={
        "h-[130px] w-[320px] border-yellow-700 m-4 shadow-inner overflow-hidden " +
        (champ?.active ? "border-r-8 border-yellow-800" : "")
      }
    >
      <img
        src={
          champ.id === undefined
            ? "https://draftlol.dawe.gg/rectangle.png"
            : "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/" +
              champ.id +
              "/" +
              champ.id +
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
