import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const { data: matchHistory } = await supabase
    .from("match_history_total")
    .select("*")
    .order("DataPartita", { ascending: true });
  if (!matchHistory) {
    return;
  }
  return (
    <div>
      <div className="container mx-auto pt-6">
        <p className="text-center text-white text-[3rem] font-bold">
          MATCH HISTORY EFM League
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-12 bg-white rounded-xl my-10">
        <div className="col-span-3 p-2 font-bold text-[1.4rem] uppercase border-2 bg-purple-200">
          Data
        </div>
        <div className="col-span-3 p-2 font-bold text-[1.4rem] uppercase border-2 bg-yellow-200">
          Name
        </div>
        <div className="col-span-2 p-2 font-bold text-[1.4rem] uppercase border-2 bg-blue-200">
          Win
        </div>
        <div className="col-span-4 p-2 font-bold text-[1.4rem] uppercase border-2 bg-neutral-200">
          MVP
        </div>
        {matchHistory.reverse().map((game) => (
          <a
            href={"/match/" + game.IDPartita}
            className="col-span-12 grid grid-cols-12 hover:scale-105"
          >
            <div className="col-span-3 p-2 bg-purple-50 border-b-2 border-black/20">
              {game.DataPartita.split("T")[0].replaceAll("-", "/")}
            </div>
            <div className="col-span-3 p-2 bg-yellow-50 text-[1.3rem] border-b-2 border-black/20">
              {game.NomePartita}
            </div>
            <div
              className={
                "col-span-2 p-2 font-bold text-[1.3rem] border-b-2 border-black/20  " +
                (game.SquadraVincente === "blue" ? "bg-blue-200" : "bg-red-200")
              }
            >
              {game.SquadraVincente === "blue" ? "BLUE" : "RED"}
            </div>
            <div className="col-span-4 p-2 bg-blue-50 text-[1rem] border-b-2 border-black/20">
              {game.NomeUtenteMVP}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
