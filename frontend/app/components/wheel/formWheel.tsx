"use client";
import React, { useEffect, useState } from "react";
import Ruota from "./Ruota";

export default function formWheel({ data }: { data: any[] }) {
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

  console.log(w);
  return (
    <div>
      <Ruota
        data={selection.length === 0 ? [{ option: "VUOTO" }] : w}
        setSelection={setSelection}
      />
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
                  ? "./img/screenshots/frame_" + user.name + ".jpg"
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
    </div>
  );
}
