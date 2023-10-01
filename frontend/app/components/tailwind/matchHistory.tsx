"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Icon = (id: any, open: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export default function matchHistory() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: React.SetStateAction<number>) =>
    setOpen(open === value ? 0 : value);

  return (
    <div>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <div className=" flex ">
          <p className="border-2 bg-black border-Gold text-white text-[2rem] hover:text-gray-300">
            01/10/2023
          </p>
        </div>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="border-2 bg-black border-Gold text-white grid grid-cols-8 text-[2rem] hover:text-gray-300"
        >
          <div className="pl-2 col-span-2 ">22:30</div>
          <div className="col-span-4 text-center ">
            <span className="text-red-500">RED</span> ↤ 0 - 1 ↦{" "}
            <span className="text-blue-500">BLUE</span>
          </div>
          <div className="col-span-1">{""}</div>
        </AccordionHeader>
        <AccordionBody>
          <div className="grid grid-cols-2 relative">
            <div className="bg-white border border-black">
              <p className="bg-red-400 text-white text-center text-[3rem] font-bold">
                TEAM RED
              </p>
              <div className="pl-6">
                <div className="flex items-center py-4">
                  <img src="../../img/roles/top.png" className="h-16" alt="" />{" "}
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                </div>
                <div className="flex items-center py-4">
                  <img
                    src="../../img/roles/jungle.png"
                    className="h-16"
                    alt=""
                  />{" "}
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                </div>
                <div className="flex items-center py-4">
                  <img src="../../img/roles/mid.png" className="h-16" alt="" />{" "}
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                </div>
                <div className="flex items-center py-4">
                  <img src="../../img/roles/adc.png" className="h-16" alt="" />{" "}
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                </div>
                <div className="flex items-center py-4">
                  <img
                    src="../../img/roles/support.png"
                    className="h-16"
                    alt=""
                  />{" "}
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute border-2 p-1 border-black bg-white left-[50%] top-[50%] -translate-x-[50%] shadow-lg">
              <p className="text-[3rem] text-yellow-700 b-white font-bold  text-center">
                MVP
              </p>
              <p className="text-[3rem] text-black b-white font-bold">
                Minimo pericolo
              </p>
            </div>
            <div className="bg-white border border-black">
              <p className="bg-blue-400 text-white text-center text-[3rem] font-bold">
                TEAM BLUE
              </p>
              <div className="pr-6">
                <div className="flex items-center justify-end py-4">
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                  <img src="../../img/roles/top.png" className="h-16" alt="" />{" "}
                </div>
                <div className="flex items-center justify-end py-4">
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                  <img
                    src="../../img/roles/jungle.png"
                    className="h-16"
                    alt=""
                  />{" "}
                </div>
                <div className="flex items-center justify-end py-4">
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                  <img src="../../img/roles/mid.png" className="h-16" alt="" />{" "}
                </div>
                <div className="flex items-center justify-end py-4">
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                  <img src="../../img/roles/adc.png" className="h-16" alt="" />{" "}
                </div>
                <div className="flex items-center justify-end py-4">
                  <p className="text-[1.5rem] font-semibold text-black">
                    Minimo Pericolo
                  </p>
                  <img
                    src="../../img/roles/support.png"
                    className="h-16"
                    alt=""
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <div className=" flex ">
          <p className="border-2 bg-black border-Gold text-white text-[2rem] hover:text-gray-300">
            20/09/2023
          </p>
        </div>
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="border-2 bg-black border-Gold text-white grid grid-cols-8 text-[2rem] hover:text-gray-300"
        >
          <div className="pl-2 col-span-2 ">22:30</div>
          <div className="col-span-4 text-center ">
            <span className="text-red-500">RED</span> ↤ 0 - 1 ↦{" "}
            <span className="text-blue-500">BLUE</span>
          </div>
          <div className="col-span-1">{""}</div>
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="border-2 bg-black border-Gold text-white grid grid-cols-8 text-[2rem] hover:text-gray-300"
        >
          <div className="pl-2 col-span-2 ">22:30</div>
          <div className="col-span-4 text-center ">
            <span className="text-red-500">RED</span> ↤ 0 - 1 ↦{" "}
            <span className="text-blue-500">BLUE</span>
          </div>
          <div className="col-span-1">{""}</div>
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
    </div>
  );
}
