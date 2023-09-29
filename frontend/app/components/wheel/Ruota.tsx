"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
export default function Ruota({
  data,

  setSelection,
}: {
  data: any[];

  setSelection: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const backgroundUser = [
    "#e8911e",
    "#e81e1e",
    "#e1e81e",
    "#e81eca",
    "#1ee8b6",
    "#36e81e",
    "#5b4dff",
    "#911ee8",
    "#ebcc1e",
    "#98e0eb",
  ];
  const backgroundSide = ["#0905fc", "#fc0505"];
  const backgroundRole = [
    "#f5cd05",
    "#6df505",
    "#9661f2",
    "#e3611b",
    "#f72daa",
  ];
  const side = [{ option: "BLUE" }, { option: "RED" }];
  const role = [
    { option: "TOP" },
    { option: "JUNGLE" },
    { option: "MID" },
    { option: "ADC" },
    { option: "SUPP" },
  ];
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState({
    userSpinning: false,
    sideSpinning: false,
    roleSpinning: false,
  });

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      console.log(data[newPrizeNumber].option);
    }
  };

  const handleConfirm = () => {
    setShowModal((showModal) => ({ ...showModal, userSpinning: false }));
    setSelection((selection) =>
      selection.filter((el) => el.name !== data[prizeNumber].option)
    );
  };
  return (
    <>
      <div className="grid grid-rows-2 grid-flow-col">
        <div className="flex overflow-hidden row-span-2 justify-center items-center ">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            spinDuration={0.5}
            backgroundColors={backgroundUser}
            onStopSpinning={() => {
              setMustSpin(false);
              setShowModal((showModal) => ({
                ...showModal,
                userSpinning: true,
              }));
            }}
          />
        </div>

        <div className="overflow-hidden ">
          <div className="scale-[60%]">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={role}
              spinDuration={0.5}
              backgroundColors={backgroundRole}
              onStopSpinning={() => {
                setMustSpin(false);
                setShowModal((showModal) => ({
                  ...showModal,
                  userSpinning: true,
                }));
              }}
            />
          </div>
        </div>
        <div className="overflow-hidden ">
          <div className="scale-[60%]">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={side}
              spinDuration={0.5}
              backgroundColors={backgroundSide}
              onStopSpinning={() => {
                setMustSpin(false);
                setShowModal((showModal) => ({
                  ...showModal,
                  userSpinning: true,
                }));
              }}
            />
          </div>
        </div>

        <div className=" bg-neutral-100 overflow-hidden row-span-2">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa
        </div>
      </div>

      <p
        onClick={handleSpinClick}
        className="text-[4rem] bg-white text-center mx-auto rounded-xl my-4 hover:bg-slate-100 hover:cursor-pointer hover:scale-105"
      >
        SPIN!
      </p>
      <div
        className={
          "fixed top-[50%] left-[50%] -translate-x-[50%] " +
          (showModal.userSpinning ? "" : "hidden")
        }
      >
        <p
          onClick={handleConfirm}
          className="text-[4rem] bg-white text-center mx-auto rounded-xl my-4 hover:bg-slate-100 hover:cursor-pointer hover:scale-105"
        >
          ok
        </p>
      </div>
    </>
  );
}
