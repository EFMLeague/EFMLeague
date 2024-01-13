"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function SelectUser({ users }: { users: any }) {
  const [filter, setFilter] = useState("");
  const usersFiltered = users.filter((user: any) =>
    user.dbName.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(users);

  return (
    <div>
      <p className="text-black bg-white p-1 m-2 font-bold text-5xl text-center">
        OUR PLAYERS
      </p>
      <div className="flex justify-center mx-2">
        <img src="./img/icons/lente-icon.png" className="bg-white p-2" alt="" />
        <input
          type="text"
          placeholder="Filter by username"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4">
        {usersFiltered?.map((user: any, index: any) => (
          <a
            className="col-span-4 m-2 md:col-span-1"
            href={"./user/" + user.dbName}
            key={user.id}
          >
            <div className="">
              <div className="text-3xl font-bold text-center text-white bg-black">
                {user.dbName}
              </div>
              <div>
                {user.video_source ? (
                  <Image
                    className="img-card h-full w-full"
                    src={"/img/screenshots/frame_" + user.dbName + ".jpg"}
                    alt=""
                    width={562}
                    height={1000}
                  />
                ) : (
                  <Image
                    className="img-card h-full w-full"
                    src={"/img/screenshots/frame_intro.jpg"}
                    alt=""
                    width={562}
                    height={1000}
                  />
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
