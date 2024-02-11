"use client";
import React, { useState } from "react";

export default function Staff() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };
  return (
    <div
      className={
        "bg-[#E02A35] transition-all duration-[200ms] p-2 " +
        (open
          ? " h-screen w-screen absolute top-0 right-0 left-0 bottom-0 "
          : " h-[230px] w-full hover:scale-105 hover:cursor-pointer hover:shadow-gray-500 hover:shadow-lg rounded-[30px]")
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
          <h1 className="text-[2.8vw] text-white font-bold">STAFF</h1>
        </div>

        <div className={"" + (open ? " block " : " hidden")}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
          dignissimos est aliquam id officia, eaque maxime reiciendis odit
          explicabo illo nam, ex soluta ipsa perspiciatis possimus ullam
          distinctio voluptatibus? Repellat!
        </div>
      </div>
    </div>
  );
}
