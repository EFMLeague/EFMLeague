"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import Team from "../components/pages/team";
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
    <div className="grid grid-cols-12 grid-rows-9 gap-4 min-h-screen w-screen background-home">
      <div className="col-span-3 col-start-2 max-h-[100px]">
        <div className="flex h-full w-full items-center">
          <img
            src="./logo/logoWithout.svg"
            className="h-[70px] w-[60px]"
            alt=""
          />
          <h1 className="text-white text-[2.8rem] uppercase px-2">
            EASY FOR ME
          </h1>
        </div>
      </div>
      <div className=" col-span-3 row-span-4 col-start-2 row-start-2 flex items-center justify-center flex-col h-[450px]">
        <h1 className="text-white text-[3rem]">NEW ESPORTS COMMUNITY</h1>
        <p className="text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
          provident nemo quis nihil? Consequatur voluptates placeat incidunt
          ipsa repudiandae velit, dolore possimus veritatis iure quo ullam
          exercitationem, ipsum, odit dolores.
        </p>
      </div>
      <div className="col-span-3 row-span-4 col-start-5 row-start-2">
        <Community></Community>
      </div>
      <div className=" col-span-1 row-span-1 col-start-2 row-start-6"></div>
      <div className=" row-span-2 col-start-2 row-start-7 flex items-end ">
        <Staff></Staff>
      </div>
      <div className="col-span-2 col-start-3 row-start-8 flex justify-center">
        <Contatti></Contatti>
      </div>
      <div className=" col-span-3 col-start-5 row-start-8 ">
        <Social></Social>
      </div>
      <div className="col-span-3 row-span-2 col-start-5 row-start-6 h-[200px]">
        <Strumenti></Strumenti>
      </div>
      <div className=" col-span-3 col-start-8 row-start-8 ">
        <Twitch></Twitch>
      </div>
      <div className=" col-span-3 row-span-6 col-start-8 row-start-2">
        <Tournament></Tournament>
      </div>
      <div className=" row-span-6 col-start-11 row-start-2">
        <Lega></Lega>
      </div>
      <div className=" col-start-11 row-start-8  ">
        <Discord></Discord>
      </div>
      <div className=" col-span-10 col-start-2 row-start-9">
        <div className="flex w-full justify-evenly text-white/10">
          <p>Termini e condizioni</p>
          <p>Cookies</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <div className=" col-span-2 row-span-2 col-start-3 row-start-6"></div>
    </div>
  );
}
