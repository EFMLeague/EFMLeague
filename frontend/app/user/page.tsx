"use client";
import React from "react";
export default function user() {
  return (
    <div className="background-user">
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate">
        PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
      </p>
      <div className="d-flex justify-content-center flex-wrap p-4">
        <video className="video-card" autoPlay muted loop>
          <source src="./video/PresentazioneNico.mp4" type="video/mp4" />
        </video>
        <div className="">
          <div className="d-flex flex-wrap p-2">
            <p className="subtitle-users">&nbsp;PERSONAL &nbsp;</p>
            <p className="subtitle-users">&nbsp;STATS &nbsp;</p>
          </div>

          <div className="d-flex flex-wrap p-2">
            <p className="counters">&nbsp;RANK :&nbsp;</p>
            <p className="counters">&nbsp;PLATINUM&nbsp;</p>
          </div>

          <div className="d-flex flex-wrap p-2">
            <p className="counters">&nbsp;WinRate :&nbsp;</p>
            <p className="counters">&nbsp;50%&nbsp;</p>
          </div>

          <div className="d-flex flex-wrap p-2">
            <p className="subtitle-users">&nbsp;CUSTOM &nbsp;</p>
            <p className="subtitle-users">&nbsp;STATS &nbsp;</p>
          </div>
          <div className="d-flex flex-wrap p-2">
            <p className="counters">&nbsp;GAMES PLAYED :&nbsp;</p>
            <p className="counters">&nbsp;13&nbsp;</p>
          </div>
          <div className="d-flex flex-wrap p-2">
            <p className="counters">&nbsp;POINTS :&nbsp;</p>
            <p className="counters">&nbsp;5&nbsp;</p>
          </div>
          <div className="d-flex flex-wrap p-2">
            <p className="counters">&nbsp;AMMONIZIONI :&nbsp;</p>
            <p className="counters">&nbsp;0&nbsp;</p>
          </div>
          <div className="d-flex flex-wrap p-2">
            <p className="counters">&nbsp;%WR SIDE :&nbsp;</p>
            <p className="counters">&nbsp;BLUE&nbsp;</p>
          </div>
        </div>
      </div>
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate1">
        PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER PLAYER
      </p>
    </div>
  );
}
