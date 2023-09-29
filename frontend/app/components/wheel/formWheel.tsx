"use client";
import React, { useState } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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

  return (
    <div className="grid grid-cols-10 gap-2">
      {data.map((user) => (
        <div
          key={user.id}
          className={
            "bg-black " +
            (selection.includes(user)
              ? "border-4 border-green-600"
              : "border border-white")
          }
          onClick={() => handleChange(user)}
        >
          <img
            className="object-cover object-center w-full h-[150px]"
            src={
              user.video_source
                ? "./img/screenshots/frame_" + user.name + ".jpg"
                : "./img/screenshots/frame_intro.jpg"
            }
            alt=""
          />
          <p className="bg-black text-white text-xl text-center">{user.name}</p>
        </div>
      ))}
    </div>
  );
}
