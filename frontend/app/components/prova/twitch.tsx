"use client";

import React, { useState } from "react";
import { FaTwitch } from "react-icons/fa";
export default function Twitch() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };
  return (
    <div
      className={
        "bg-[#6440A4] transition-all duration-[300ms] p-2 h-[100px] w-full flex items-center hover:scale-105 hover:cursor-pointer hover:shadow-gray-500 hover:shadow-lg rounded-[30px]"
      }
    >
      <FaTwitch fill="white" className="h-[80%] w-[100px] " />
      <h1 className="text-white text-[2.2rem]">Twitch.tv/EasyForMe</h1>
    </div>
  );
}
