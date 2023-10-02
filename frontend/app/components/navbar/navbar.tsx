"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
// import "../assets/css/navbar.css";
import Link from "next/link";
import Logout from "./logout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const [colorChange, setColorChange] = useState<boolean>(true);

  const handleColorChange = () => {
    if (window.scrollY < window.screen.height / 3) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  if (typeof window !== "undefined") {
    // Client-side-only code
    window.addEventListener("scroll", handleColorChange);
  }

  return (
    <nav
      className={
        "h-16 w-full fixed top-0 z-50 transition-all duration-500 bg-black text-white"
      }
    >
      <div className="flex flex-col pt-1 lg:container lg:mx-auto lg:h-full lg:justify-between lg:flex-row">
        <div className=" text-[2rem] flex items-center pl-5 lg:pl-0">
          <div className="flex h-full w-full items-center">
            <div
              className={
                "h-full lg:h-full transition-all w-16 items-centers pt-2"
              }
            >
              <img src="/img/logo/Logocentrato.png" className="h-12" alt="" />
            </div>
            <a href="/">
              <h1 className="lg:flex italian-underline lg:font-bold">
                EFM League
              </h1>
            </a>
          </div>
          <div
            className=" text-[2rem] absolute right-5 hover:cursor-pointer lg:hidden"
            onClick={() => handleOpen()}
          >
            {/* Icona */}
            <div className="text-[2rem]">
              <img
                src="/img/logo/icons8-hamburger.svg"
                className="h-12"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          className={
            "text-[2rem] flex flex-col justify-evenly items-center overflow-hidden transition-all duration-[300ms] bg-black lg:transition-none lg:backdrop-blur-none lg:backdrop-brightness-100 lg:h-full lg:opacity-100 lg:pb-0 " +
            (isOpen === false
              ? " h-0 opacity-0 overflow-hidden lg:block "
              : " h-screen opacity-100 pb-12 text-white ") +
            (colorChange === true ? " !text-white " : " ")
          }
          id="navlinks"
        >
          <ul className="flex flex-col text-center w-full lg:flex-row lg:items-center lg:justify-center lg:h-full">
            <li className="underline-link">
              <a href="/" onClick={() => handleOpen()}>
                HOME
              </a>
            </li>
            <li className="underline-link">
              <a href="/user" onClick={() => handleOpen()}>
                USERS
              </a>
            </li>
            <li className="underline-link">
              <a href="/ranking" onClick={() => handleOpen()}>
                RANKINGS
              </a>
            </li>
            <li className="underline-link">
              <a href="/match" onClick={() => handleOpen()}>
                HISTORY
              </a>
            </li>
            <li className="underline-link">
              <a href="/wheel" onClick={() => handleOpen()}>
                RUOTA
              </a>
            </li>
            <li className="underline-link">
              <a href="/addMatch" onClick={() => handleOpen()}>
                ADMIN
              </a>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
