"use client";

import React, { useState } from "react";

import { SiLinktree } from "react-icons/si";
export default function Twitch() {
  return (
    <div
      className={
        "bg-[#1A4FB7] transition-all duration-[300ms] p-2 h-[100px] w-full flex items-center hover:scale-105 hover:cursor-pointer hover:shadow-gray-500 hover:shadow-lg rounded-[30px]"
      }
    >
      <SiLinktree fill="white" className="h-[80%] w-[100px] " />
      <h1 className="text-white text-[3rem] font-bold">Social</h1>
    </div>
  );
}
