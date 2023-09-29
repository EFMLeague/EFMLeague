"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const backgrounds = ["#ff1493", "#b22222", "#ff4500", "#4169e1", "#00bfff"];

export default function Ruota({ data }: { data: any[] }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      console.log(data[newPrizeNumber].option);
    }
  };

  function rimuoviElementoPerIndice(array: any[], indice: number) {
    if (indice >= 0 && indice < array.length) {
      array.splice(indice, 1); // Utilizza il metodo splice() per rimuovere un elemento dall'array
    } else {
      console.error("L'indice specificato non è valido.");
    }
  }

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={backgrounds}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />

      <button onClick={handleSpinClick} className="text-[4rem] bg-white">
        SPIN
      </button>
    </>
  );
}
