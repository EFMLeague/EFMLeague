"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
export default function Ruota({
  data,
  setSelection,
  roles,
  setRoles,
}: {
  data: any[];
  setSelection: React.Dispatch<React.SetStateAction<any[]>>;
  roles: any[];
  setRoles: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const backgroundUser = [
    "#e8911e",
    "#a832a4",
    "#e1e81e",
    "#e81eca",
    "#1ee8b6",
    "#36e81e",
    "#5b4dff",
    "#911ee8",
    "#ebcc1e",
    "#98e0eb",
  ];

  const [generatedTeam, setGeneratedTeam] = useState({
    red: { TOP: "", JUNGLE: "", MID: "", ADC: "", SUPPORT: "" },
    blue: { TOP: "", JUNGLE: "", MID: "", ADC: "", SUPPORT: "" },
  });
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
    }
  };

  const generateTeam = () => {
    if (roles[prizeNumber].option.endsWith(" ")) {
      const roleNoSpace = roles[prizeNumber].option.split(" ")[0];
      setGeneratedTeam((generatedTeam) => ({
        ...generatedTeam,
        red: { ...generatedTeam.red, [roleNoSpace]: data[prizeNumber].option },
      }));
    } else {
      setGeneratedTeam((generatedTeam) => ({
        ...generatedTeam,
        blue: {
          ...generatedTeam.blue,
          [roles[prizeNumber].option]: data[prizeNumber].option,
        },
      }));
    }
  };

  const handleConfirm = () => {
    setShowModal((showModal) => ({ ...showModal, userSpinning: false }));
    setSelection((selection) =>
      selection.filter((el) => el.name !== data[prizeNumber].option)
    );
    setRoles((roles) =>
      roles.filter((el) => el.option !== roles[prizeNumber].option)
    );
    generateTeam();
  };
  return (
    <>
      <div className="grid grid-rows-2 grid-flow-row md:grid-flow-col ">
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

        <div className="flex overflow-hidden row-span-2 justify-center items-center ">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={roles.length === 0 ? [{ option: "VUOTO" }] : roles}
            spinDuration={0.5}
            onStopSpinning={() => {
              setMustSpin(false);
              setShowModal((showModal) => ({
                ...showModal,
                userSpinning: true,
              }));
            }}
          />
        </div>

        <div className="bg-white min-w-[300px]">
          <p className="bg-red-600 text-white text-center border-2 border-red-900 text-[2rem]">
            RED
          </p>
          {Object.entries(generatedTeam.red).map(([key, value]) => (
            <div
              className="flex justify-start items-center py-2 pl-2"
              key={key}
            >
              <img
                src={"../../img/roles/" + key.toLowerCase() + ".png"}
                alt=""
                className="h-8"
              />
              <p className="font-bold">{`: ${value}`} </p>
            </div>
          ))}
        </div>
        <div className=" bg-white">
          <p className="bg-blue-600 text-white text-center border-2 border-blue-900 text-[2rem]">
            BLUE
          </p>
          {Object.entries(generatedTeam.blue).map(([key, value]) => (
            <div
              className="flex justify-start items-center py-2 pl-2"
              key={key}
            >
              <img
                src={"../../img/roles/" + key.toLowerCase() + ".png"}
                alt=""
                className="h-8"
              />
              <p className="font-bold">{`: ${value}`} </p>
            </div>
          ))}
        </div>
      </div>

      <p
        onClick={() => handleSpinClick()}
        className={
          "text-[4rem] text-center mx-auto rounded-xl my-4 hover:bg-slate-100 hover:cursor-pointer hover:scale-105 " +
          (data[0].option === "VUOTO"
            ? " bg-gray-600 pointer-events-none "
            : " bg-gray-200") +
          (roles[0].option === "VUOTO"
            ? " bg-gray-600 pointer-events-none "
            : " bg-gray-200")
        }
      >
        SPIN!
      </p>

      <div
        className={
          "fixed top-[50%] left-[50%] -translate-x-[50%] z-50 w-[80%] bg-gray-200 border-4 border-black " +
          (showModal.userSpinning ? "" : "hidden")
        }
      >
        <div className="text-[4rem] text-center my-4 ">
          <p>
            <span className="font-bold">{roles[prizeNumber]?.option}</span>
            {": "}
            {data[prizeNumber]?.option}
          </p>
          <div className="flex justify-evenly w-full">
            <div
              className="bg-green-600 rounded-md w-1/4 hover:scale-105 hover:cursor-pointer"
              onClick={() => handleConfirm()}
            >
              OK!
            </div>
            <div
              className="bg-red-600 rounded-md w-1/4 hover:scale-105 hover:cursor-pointer"
              onClick={() =>
                setShowModal((showModal) => ({
                  ...showModal,
                  userSpinning: false,
                }))
              }
            >
              NOPE!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
