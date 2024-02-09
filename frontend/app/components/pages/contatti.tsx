"use client";
import React, { useRef, useState } from "react";

export default function Contatti() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        "bg-green-500 transition-all duration-1000 overflow-hidden " +
        (open ? " prova-animazione" : " h-32 w-full bordi-prova ")
      }
      onClick={() => {
        if (!open) setOpen(true);
      }}
    >
      Tournament + {open.toString()}
      <div
        className={
          "transition-all opacity-0 duration-700" +
          (open ? " block p-2 opacity-100" : "hidden")
        }
      >
        <button
          className="position fixed right-10 text-[4rem]"
          onClick={() => {
            setOpen(false);
          }}
        >
          {" "}
          X{" "}
        </button>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>BABBA</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>ciao</p>
        <p>suca</p>
      </div>
    </div>
  );
}
