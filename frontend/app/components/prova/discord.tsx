"use client";

import React, { useState } from "react";
import { FaDiscord } from "react-icons/fa";
export default function Discord() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };
  return (
    <div
      className={
        "bg-[#3772FF] transition-all duration-[300ms] p-2 h-[100px] w-full flex justify-center items-center hover:scale-105 hover:cursor-pointer hover:shadow-gray-500 hover:shadow-lg rounded-[30px]"
      }
    >
      <FaDiscord fill="white" className="h-[80%] w-[80%]" />
    </div>
  );
}
