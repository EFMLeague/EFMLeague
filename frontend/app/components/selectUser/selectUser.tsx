"use client";
import React, { useState } from "react";
import Image from "next/image";

type User = { id: number; name: string; banner_source: string | null };

export default function SelectUser({ users }: { users: User[] }) {
  const [filter, setFilter] = useState("");
  const usersFiltered = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <p className="text-black bg-white p-1 m-2 font-bold text-5xl text-center">
        OUR PLAYERS
      </p>
      <div className="flex justify-center mx-2">
        <img src="/img/icons/lente-icon.png" className="bg-white p-2" alt="" />
        <input
          type="text"
          placeholder="Filter by username"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4">
        {usersFiltered.map((user) => (
          <a
            className="col-span-4 m-2 md:col-span-1"
            href={"/user/" + user.name}
            key={user.id}
          >
            <div className="">
              <div className="text-3xl font-bold text-center text-white bg-black">
                {user.name}
              </div>
              <div>
                {/* banner_source indica che esiste lo screenshot personale */}
                <Image
                  className="img-card h-full w-full"
                  src={
                    user.banner_source
                      ? "/img/screenshots/frame_" + user.name + ".jpg"
                      : "/img/screenshots/frame_intro.jpg"
                  }
                  alt=""
                  width={562}
                  height={1000}
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
