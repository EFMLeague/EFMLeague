"use client";
import React, { useState } from "react";

export default function Strumenti() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };
  return (
    <div
      className={
        "bg-[#28AFB0] transition-all duration-[200ms] p-2 " +
        (open
          ? " h-screen w-screen absolute top-0 right-0 left-0 bottom-0 "
          : " h-full w-full hover:scale-105 hover:cursor-pointer hover:shadow-gray-500 hover:shadow-lg rounded-[30px]")
      }
      onClick={handleOpen}
    >
      <div className="h-full">
        <div
          className={
            "flex items-center " +
            (open ? "justify-center " : "h-full flex-wrap justify-evenly")
          }
        >
          <img src="/logo/logoWithout.svg" className="h-24 w-24 " alt="" />
          <h1 className="text-[2.8vw] text-white font-bold">Strumenti</h1>
        </div>
      </div>
    </div>
  );
}
