"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import Staff from "../components/prova/staff";
import Discord from "../components/prova/discord";
import Twitch from "../components/prova/twitch";
import Strumenti from "../components/prova/strumenti";
import Community from "../components/prova/community";
import Tournament from "../components/prova/tournament";
import Lega from "../components/prova/lega";
import Contatti from "../components/prova/contatti";
import Social from "../components/prova/social";

export default function page() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col p-[3%] background-home">
      <div className="h-[12%] w-full flex justify-start items-start ">
        <div className="h-1/2 w-full flex items-center">
          <img src="./logo/logowithout.svg" className="h-full" alt="" />
          <p className="text-[2vw] text-white px-3 "> Easy For Me</p>
        </div>
      </div>

      <div className="h-[88%] w-full flex flex-shrink-0 gap-x-[0.8%]">
        <div className="h-full basis-[32%] ">
          <div className="h-[61%] ">
            <h1 className="text-white text-[3vw]">NEW ESPORTS COMMUNITY</h1>
            <p className="text-white text-[1.5w]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
              provident nemo quis nihil? Consequatur voluptates placeat incidunt
              ipsa repudiandae velit, dolore possimus veritatis iure quo ullam
              exercitationem, ipsum, odit dolores.
            </p>
          </div>
          <div className="h-[39%]  w-full flex justify-end items-end gap-[3%]">
            <div className="h-full basis-[40%]  ">
              <Staff></Staff>
            </div>
            <div className="h-[51.5%] basis-[60%]  ">
              <Contatti></Contatti>
            </div>
          </div>
        </div>
        <div className="h-full basis-[25%]  flex flex-col gap-[1.8%]">
          <div className=" h-[49%]  ">
            <Community></Community>
          </div>
          <div className=" h-[31%] ">
            <Strumenti></Strumenti>
          </div>
          <div className=" h-[20%] ">
            <Social></Social>
          </div>
        </div>
        <div className="h-full basis-[31%] flex flex-col gap-[1.8%]">
          <div className="h-[80%] ">
            <Tournament></Tournament>
          </div>
          <div className="h-[20%] ">
            <Twitch></Twitch>
          </div>
        </div>
        <div className="h-full basis-[12%] flex flex-col gap-[1.8%]">
          <div className="h-[80%] ">
            <Lega></Lega>
          </div>
          <div className="h-[20%] ">
            <Discord></Discord>
          </div>
        </div>
      </div>
    </div>
  );
}
