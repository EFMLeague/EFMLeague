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
    .from("user_played_match")
    .select()
    .eq("match_id", idmatch);

  if (match === null) {
    return;
  }
  const extractPlayer = (
    role: "top" | "mid" | "jng" | "adc" | "sup",
    team: "blue" | "red"
  ) => {
    const p = match.find(
      (el) => el.hasPlayed_role === role && el.hasPlayed_team === team
    );
    return <span>{p.user_name}</span>;
  };
  console.log(match);
  return (
    <div className="overflow-hidden">
      <p className="font-bold text-white text-center bg-black overflow-hidden text-[3rem] whitespace-pre w-full">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>

      {/* <div className="w-100 d-flex justify-content-center">
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
        <div className="d-flex justify-content-center align-items-center w-100 p-4 bg-white">
        <img src="./../img/crown1.png" width={150} alt="" />
        <label className="label-match text-black">MVP</label>

        <img src="./../img/crown1.png" width={150} alt="" />
      </div>*/}
      <div className="grid grid-cols-6 ">
        <div className="bg-blue-500 col-span-6 lg:col-span-2">
          <p className="text-[3.5rem] font-bold text-white text-center">
            TEAM BLUE
          </p>

          <div className="flex items-center py-3">
            <img
              src="./../img/roles/top.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("top", "blue")}
            </p>
          </div>

          <div className="flex items-center py-3">
            <img
              src="./../img/roles/jungle.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("jng", "blue")}
            </p>
          </div>

          <div className="flex items-center py-3">
            <img
              src="./../img/roles/mid.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("mid", "blue")}
            </p>
          </div>

          <div className="flex items-center py-3">
            <img
              src="./../img/roles/adc.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("adc", "blue")}
            </p>
          </div>
          <div className="flex items-center py-3">
            <img
              src="./../img/roles/support.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("sup", "blue")}
            </p>
          </div>
        </div>

        <div className="bg-white col-span-6 flex flex-col justify-between min-h-[550px] py-12 lg:col-span-2 lg:py-0">
          <div>
            <p className="text-center text-[4rem] font-bold">MATCH</p>
            <p className=" text-black text-center text-[1.8rem]">
              {match[0].match_date.split("T")[0].replaceAll("-", "/")}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-center">
              <img src="./../img/trofeo.png" className="max-h-[200px]" alt="" />
            </div>
            <div>
              <p className="text-[3rem] font-bold uppercase text-black text-center">
                {match[0].hasPlayed_hasWon
                  ? match[0].hasPlayed_team
                  : match[0].hasPlayed_team === "RED"
                  ? "BLUE"
                  : "RED"}
              </p>
            </div>
            <div className="text-center ">
              <img src="./../img/trofeo.png" className="max-h-[200px]" alt="" />
            </div>
          </div>

          <div className="flex justify-center items-center pb-4">
            <div className="text-center">
              <img src="./../img/crown1.png" className="max-h-[150px]" alt="" />
            </div>
            <div className="">
              <p className="font-bold text-black text-center text-[2.3rem]">
                {match.find((p) => p.hasPlayed_mvp).user_name}
              </p>
            </div>
            <div className="col-3 text-center">
              <img src="./../img/crown1.png" className="max-h-[150px]" alt="" />
            </div>
          </div>
        </div>
        <div className="bg-red-500 col-span-6 lg:col-span-2">
          <p className="text-[3.5rem] font-bold text-white text-center">
            TEAM RED
          </p>
          <div className="flex items-center py-3">
            <img
              src="./../img/roles/top.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("top", "red")}
            </p>
          </div>
          <div className="flex items-center py-3">
            <img
              src="./../img/roles/jungle.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("jng", "red")}
            </p>
          </div>
          <div className="flex items-center py-3">
            <img
              src="./../img/roles/mid.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("mid", "red")}
            </p>
          </div>
          <div className="flex items-center py-3">
            <img
              src="./../img/roles/adc.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("adc", "red")}
            </p>
          </div>
          <div className="flex items-center py-3">
            <img
              src="./../img/roles/support.png"
              className="p-1 h-[100px]"
              alt=""
            />
            <p className="text-[1.8rem] font-bold text-white">
              {extractPlayer("sup", "red")}
            </p>
          </div>
        </div>
      </div>

      <p className="font-bold text-white text-center bg-black overflow-hidden text-[3rem] whitespace-pre w-full">
        GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME
        GAME GAME GAME GAME GAME
      </p>
    </div>
  );
}
