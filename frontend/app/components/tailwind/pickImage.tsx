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
        "h-[20%] w-[320px] border-black m-2 shadow-xl overflow-hidden  " +
        (champ.id === undefined
          ? " pickImgEmpty "
          : champ?.active
          ? "h-[70%] transition-all duration-300 pickImg"
          : " pickImg ")
      }
      style={{
        backgroundImage:
          champ.id === undefined
            ? `url("https://draftlol.dawe.gg/rectangle.png")`
            : `url("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/` +
              champ.id +
              `/` +
              champ.id +
              `000.jpg")`,
      }}
    ></div>
  );
}
