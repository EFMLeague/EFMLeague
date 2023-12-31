import React from "react";

import "../../globals.css";

export default function PickImage({
  champ,
}: {
  champ: {
    id: number | undefined;
    active: boolean;
    champName: string;
  };
}) {
  return (
    <a
      href={
        "https://u.gg/lol/champions/" +
        champ.champName.toLowerCase() +
        "/counter"
      }
      target="_blank"
      className={
        "h-[20%] w-[320px] border-black m-1 overflow-hidden relative border-2 shadow-xl hover:cursor-pointer " +
        (champ.id === undefined && champ?.active
          ? " pickImgEmpty h-[70%] transition-all duration-300"
          : champ?.active && champ.id
          ? "h-[70%] transition-all duration-300 pickImg"
          : champ.id
          ? " pickImg "
          : "pickImgEmpty")
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
    >
      <p className="absolute right-2 bottom-0 text-gray-200">
        {champ.champName}
      </p>
    </a>
  );
}
