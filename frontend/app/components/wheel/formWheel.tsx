"use client";
import React, { useEffect, useState } from "react";
import Ruota from "./Ruota";

export default function formWheel({ data }: { data: any[] }) {
  const [roles, setRoles] = useState([
    //spazio per indicare RED TEAM
    { option: "TOP ", style: { backgroundColor: "#ff1900" } },
    { option: "TOP", style: { backgroundColor: "#0800ff" } },
    { option: "JUNGLE ", style: { backgroundColor: "#ff1900" } },
    { option: "JUNGLE", style: { backgroundColor: "#0800ff" } },
    { option: "MID ", style: { backgroundColor: "#ff1900" } },
    { option: "MID", style: { backgroundColor: "#0800ff" } },
    { option: "ADC ", style: { backgroundColor: "#ff1900" } },
    { option: "ADC", style: { backgroundColor: "#0800ff" } },
    { option: "SUPPORT ", style: { backgroundColor: "#ff1900" } },
    { option: "SUPPORT", style: { backgroundColor: "#0800ff" } },
  ]);

  const [selection, setSelection] = useState<any[]>([]);
  const handleChange = (user: any) => {
    if (selection.includes(user)) {
      setSelection((selection) => selection.filter((el) => el.id !== user.id));
    } else {
      if (selection.length < 10) {
        setSelection((selection) => [...selection, user]);
      }
    }
  };
  const w = selection.map((w) => ({ option: w.name }));

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {data.map((user) => (
          <div
            key={user.id}
            className={
              "bg-black overflow-hidden " +
              (selection.includes(user)
                ? "border-4 border-green-600"
                : "border border-white")
            }
            onClick={() => handleChange(user)}
          >
            <img
              className="object-cover object-center w-full h-[170px]"
              src={
                user.video_source
                  ? "./img/screenshots/frame_" + user.dbName + ".jpg"
                  : "./img/screenshots/frame_intro.jpg"
              }
              alt=""
            />
            <p className="bg-black text-white text-xl text-center">
              {user.name}
            </p>
          </div>
        ))}
      </div>
      <Ruota
        data={
          selection.length === 0
            ? [{ option: "VUOTO", style: { backgroundColor: "#898c8b" } }]
            : w
        }
        roles={
          roles.length === 0
            ? [{ option: "VUOTO", style: { backgroundColor: "#898c8b" } }]
            : roles
        }
        setRoles={setRoles}
        setSelection={setSelection}
      />
    </div>
  );
}
