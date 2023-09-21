import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function Page({
  params: { idmatch },
}: {
  params: {
    idmatch: string;
  };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: match } = await supabase
    .from("hasPlayed")
    .select()
    .eq("rMatch", idmatch);

  if (match === null) {
    return;
  }
  console.log(match[0]);
  return (
    <div>
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate pt-5">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>

      <div className="d-flex flex-wrap w-100 bg-white justify-content-center">
        <div className="w-100 d-flex justify-content-center">
          <p className="bg-dark match-title">MATCH</p>
        </div>

        <div className="input-match">
          <label className="label-match">MATCH NAME:</label>
        </div>
        <div className="input-match">
          <label className="label-match">DAY OF THE MATCH:</label>
        </div>
        <div className="d-flex justify-content-center align-items-center w-100 p-4">
          <img src="./../img/trofeo.png" width={150} alt="" />
          <label className="label-match">WINNERS</label>
          <img src="./../img/trofeo.png" width={150} alt="" />
        </div>

        <div className="bg-primary side">
          <p className="team-name text-center">TEAM BLUE</p>
          <div className="line-role-name">
            <img
              src="./../img/roles/top.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">TOP:</p>
          </div>

          <div className="line-role-name">
            <img
              src="./../img/roles/jungle.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">JUNGLE:</p>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/mid.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">MID:</p>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/bot.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">ADC:</p>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/support.png"
              className="p-1"
              height={50}
              alt=""
            />
            <p className="ruoli-blue">SUPP:</p>
          </div>
        </div>
        <div className="side bg-danger">
          <p className="team-name text-center">TEAM RED</p>
          <div className="line-role-name">
            <img
              src="./../img/roles/top.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">TOP:</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/jungle.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">JUNGLE:</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/mid.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">MID:</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/bot.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">ADC:</label>
          </div>
          <div className="line-role-name">
            <img
              src="./../img/roles/support.png"
              className="p-1"
              height={50}
              alt=""
            />
            <label className="ruoli-red">SUPP:</label>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 p-4 bg-white">
        <img src="./../img/crown1.png" width={150} alt="" />
        <label className="label-match text-black">MVP</label>

        <img src="./../img/crown1.png" width={150} alt="" />
      </div>
      <p className="fw-bold text-white text-center title-users bg-black text-nowrap overflow-hidden traslate">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>
    </div>
  );
}
