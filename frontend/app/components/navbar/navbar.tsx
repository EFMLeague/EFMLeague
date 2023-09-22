"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
// import "../assets/css/navbar.css";
import Link from "next/link";

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
    console.log(colorChange);
  };
  if (typeof window !== "undefined") {
    // Client-side-only code
    window.addEventListener("scroll", handleColorChange);
  }

  return (
    <nav
      className={
        "h-14 w-full fixed top-0 z-50 transition-all duration-500 bg-black text-white"
      }
    >
      <div className="flex flex-col pt-1 lg:container lg:mx-auto lg:h-full lg:justify-between lg:flex-row">
        <div className=" text-[2rem] flex items-center pl-5 lg:pl-0">
          <div className="flex h-full w-full items-center">
            <div
              className={
                "h-full lg:h-full lg:w-14 transition-all w-16 items-centers " +
                (colorChange === true
                  ? " invisible lg:hidden "
                  : "h-full visible lg:flex")
              }
            >
              <img src="/img/logo/Logocentrato.png" className="h-12" alt="" />
            </div>
            <h1 className=" hidden lg:flex lg:font-bold">EFM Leaue</h1>
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
            "text-[2rem] flex justify-center items-center overflow-hidden transition-all duration-[300ms] backdrop-blur-md backdrop-brightness-50 lg:transition-none lg:backdrop-blur-none lg:backdrop-brightness-100 lg:h-full lg:opacity-100 lg:pb-0 " +
            (isOpen === false
              ? " h-0 opacity-0 overflow-hidden lg:block "
              : " h-screen opacity-100 pb-12 text-white lg:text-black ") +
            (colorChange === true ? " !text-white " : " ")
          }
          id="navlinks"
        >
          <ul className="flex flex-col text-center w-full lg:flex-row lg:items-center lg:justify-center lg:h-full">
            <li>
              <Link href="/" onClick={() => handleOpen()}>
                HOME
              </Link>
            </li>
            <li>
              <a href="/user" onClick={() => handleOpen()}>
                USERS
              </a>
            </li>
            <li>
              <a href="/" onClick={() => handleOpen()}>
                RANKINGS
              </a>
            </li>
            <li>
              <a href="/#contatti" onClick={() => handleOpen()}>
                CONTATTI
              </a>
            </li>
            <li>
              <a href="/#palestra" onClick={() => handleOpen()}>
                ADDGAME
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
